module.exports = function (app, conn_db) {

    const { uploadImage } = require("../../middleware/uploadImage.js");
    const fs = require('fs');
    const path = require('path');
    const crypto = require('crypto');
    const { transporter } = require('../../utils/mailer.js');


    const { verifyToken } = require("../../middleware/verifyToken.js");

    app.get('/api/users', verifyToken, (req, res) => {
        try {
            let sql = `SELECT users.first_names, users.infix, users.last_name,  users.street_name, users.house_number, users.house_letter, 
            users.house_number_addition, users.zip_code, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no users, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No users found' });
                }


                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "first_names": element.first_names,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "role": element.role_name
                    });
                });

                res.send({ "users": usersJSON });
            })
        } catch (error) {
            console.error("Error during user retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/users/profile-picture/:filename', verifyToken, (req, res) => {

        const userId = req.user.id;
        const filename = req.params.filename;

        const filePath = path.join(process.cwd(), 'uploads/profile_pictures', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        let sql = `SELECT profile_picture_url FROM users WHERE id = ?`;
        conn_db.query(sql, [userId], function (err, rows) {

            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const profilePictureUrl = rows[0].profile_picture_url;

            if (!profilePictureUrl || !profilePictureUrl.endsWith(filename)) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            res.sendFile(filePath);

        });
    });

    app.post('/api/users/profile-picture/', verifyToken, uploadImage.single('profile_picture'), (req, res) => {

        const userId = req.user.id;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `users/profile-picture/${file.filename}`;

        try {

            // Retrieves the old profile picture URL to delete the old image file
            let sql = `SELECT profile_picture_url FROM users WHERE id = ?`;
            conn_db.query(sql, [userId], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }


                // Deletes the old profile picture file if it exists
                const oldImageUrl = rows[0].profile_picture_url;
                const oldFilename = oldImageUrl ? path.basename(oldImageUrl) : null;

                if (oldFilename) {

                    const oldImagePath = path.join(process.cwd(), 'uploads/profile_pictures', oldFilename);

                    fs.unlink(oldImagePath, (err) => {
                        if (err && err.code !== 'ENOENT') {
                            console.error("Error deleting old profile picture:", err);
                        } else {
                            console.log("Old profile picture deleted successfully");
                        }
                    });
                }


                let sql = `UPDATE users SET profile_picture_url = ? WHERE id = ?`;
                conn_db.query(sql, [imageUrl, userId], function (err, rows) {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ error: 'Database error' });
                    }
                    if (rows.affectedRows === 0) {
                        return res.status(404).json({ error: 'User not found' });
                    }

                    res.json({
                        "message": "Profile picture updated successfully",
                        "profile_picture_url": imageUrl
                    });

                })
            })
        } catch (error) {
            console.error("Error during profile picture update:", error);
            res.status(500).json({ error: 'Internal server error' });

        }


    });


    app.put('/api/users/me', verifyToken, (req, res) => {

        const userId = req.user.id;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const permissionFieldMap = {
            'user.edit.name': [
                'initials',
                'first_names',
                'infix',
                'last_name'
            ],

            'user.edit.partner_name': [
                'partner_infix',
                'partner_last_name'
            ],

            'user.edit.name_usage': ['name_usage'],

            'user.edit.gender': ['gender'],

            'user.edit.date_of_birth': ['date_of_birth'],
            'user.edit.place_of_birth': ['place_of_birth'],

            'user.edit.address': [
                'street_name',
                'house_number',
                'house_letter',
                'house_number_addition',
                'zip_code',
                'city'
            ],

            'user.edit.contact': [
                'email',
                'phone_number',
                'mobile_number'
            ],

            'user.edit.profile_picture': [
                'profile_picture_url'
            ],

            'user.edit.position': ['position']
        };

        const permissions = req.user.permissions || [];
        let updates = {};

        for (const [permission, fields] of Object.entries(permissionFieldMap)) {

            if (permissions.includes(permission)) {

                for (const field of fields) {
                    if (req.body[field] !== undefined) {
                        updates[field] = req.body[field];
                    }
                }

            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No permitted fields to update' });
        }

        console.log("Fields to update based on permissions:", updates);

        if (updates.email && !emailRegex.test(updates.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (updates.email) {
            // Check if the new email already exists in the database
            let sqlCheckEmail = `SELECT id FROM users WHERE email = ? AND id != ?`;

            return conn_db.query(sqlCheckEmail, [updates.email, userId], async (err, rows) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }
                if (rows.length > 0) {
                    return res.status(400).json({ error: 'Email already exists' });
                }

                // Generates a new email verification token and sets the email_verified_at field to null when the email is updated
                const token = crypto.randomBytes(32).toString('hex');
                const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour

                updates.email_verification_token = token;
                updates.email_verification_token_expires_at = expiresAt;
                updates.email_verified_at = null;


                const fields = Object.keys(updates);
                const setClause = fields.map(field => `${field} = ?`).join(', ');

                const values = Object.values(updates);
                values.push(userId);

                let sqlUpdate = `UPDATE users SET ${setClause} WHERE id = ?`;

                conn_db.query(sqlUpdate, values, function (err, rows) {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    if (rows.affectedRows === 0) {
                        return res.status(404).json({ error: 'User not found' });
                    }

                    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

                    const mailOptions = {
                        from: process.env.MAIL_USER,
                        to: updates.email,
                        subject: 'Bevestig je e-mailadres',
                        html: `<p>Beste ${updates.first_names ? updates.first_names.trim().split(' ')[0] : 'gebruiker'},</p>
                       <p>Je hebt je e-mailadres gewijzigd. Klik op de onderstaande link om je nieuwe e-mailadres te bevestigen:</p>
                       <a href="${verificationLink}">Bevestig e-mailadres</a>
                       <p>Deze link is 1 uur geldig.</p>`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error sending email verification:', error);
                        } else {
                            console.log('Email verification sent:', info.response);
                        }
                    });

                    res.json({ "message": "User updated successfully and email verification sent" });

                })


            })
        }
        else {
            const fields = Object.keys(updates);
            const setClause = fields.map(field => `${field} = ?`).join(', ');

            const values = Object.values(updates);
            values.push(userId);

            let sqlUpdate = `UPDATE users SET ${setClause} WHERE id = ?`;

            conn_db.query(sqlUpdate, values, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (rows.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.json({ "message": "User updated successfully" });
            });


        }
    })


}

