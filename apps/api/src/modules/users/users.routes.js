module.exports = function (app, conn_db) {

    const { uploadImage } = require("../../middleware/uploadImage.js");
    const fs = require('fs');
    const path = require('path');


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

        const fields = Object.keys(updates);
        const setClause = fields.map(field => `${field} = ?`).join(', ');


        try {
            let sql = `UPDATE users SET ${setClause} WHERE id = ?`;

            const values = Object.values(updates);
            values.push(userId);

            conn_db.query(sql, values, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no users, return an error message
                if (rows.affectedRows === 0) {
                    return res.status(404).json({ error: 'No users found' });
                }


                res.json({ "message": "User updated successfully" });
            })
        } catch (error) {
            console.error("Error during user update:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

}
