
module.exports = function (app, conn_db) {

    app.get('/api/users', (req, res) => {
        try {
            let sql = `SELECT users.first_names, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
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
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/admin', (req, res) => {
        try {
            let sql = `SELECT users.first_names, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE roles.name = 'admin'`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there is no user with this role, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No admin found' });
                }

                let user = rows[0];

                res.send({
                    "admin": {
                        "first_names": user.first_names,
                        "infix": user.infix,
                        "last_name": user.last_name,
                        "email": user.email,
                        "role": user.role_name
                    }
                });
            })
        } catch (error) {
            console.error("Error during retrieval of admin:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/cemetery-managers', (req, res) => {
        try {
            let sql = `SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name,  users.email, users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
            JOIN role_user ON users.id = role_user.user_id
            JOIN roles ON role_user.role_id = roles.id
            WHERE roles.name = 'beheerder'
            `;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No managers found' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "id": element.id,
                        "initials": element.initials,
                        "first_names": element.first_names,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "phone_number": element.phone_number,
                        "mobile_number": element.mobile_number,
                        "profile_picture_url": element.profile_picture_url,
                        "position": element.position,
                        "role": element.role_name,
                        "role_id": element.role_id
                    });
                });

                res.send({ "cemetery-managers": usersJSON });
            })
        } catch (error) {
            console.error("Error during retrieval of managers:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/cemetery-managers/:id', (req, res) => {
        try {
            let sql = `SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name,  users.email, users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
            JOIN role_user ON users.id = role_user.user_id
            JOIN roles ON role_user.role_id = roles.id
            WHERE roles.name = 'beheerder' AND users.id = ?
            `;

            conn_db.query(sql, [req.params.id], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no users with this role, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No managers found' });
                }

                let user = rows[0];

                res.json({
                    "cemetery_manager": {
                        "id": user.id,
                        "initials": user.initials,
                        "first_names": user.first_names,
                        "infix": user.infix,
                        "last_name": user.last_name,
                        "email": user.email,
                        "phone_number": user.phone_number,
                        "mobile_number": user.mobile_number,
                        "profile_picture_url": user.profile_picture_url,
                        "position": user.position,
                        "role": user.role_name,
                        "role_id": user.role_id
                    }
                });
            })
        } catch (error) {
            console.error("Error during retrieval of the manager:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    // This is updating a cemetery manager
    app.put('/api/cemetery-managers/:id', (req, res) => {
        const userId = req.params.id

        const {
            first_names,
            infix,
            last_name,
            email,
            phone_number,
            position
        } = req.body

        const sql = `
        UPDATE users
        SET first_names = ?, infix = ?, last_name = ?, email = ?, phone_number = ?, position = ?
        WHERE id = ?
    `

        conn_db.query(
            sql,
            [first_names, infix, last_name, email, phone_number, position, userId],
            (err, result) => {
                if (err) {
                    console.error('Database error:', err)
                    return res.status(500).json({ error: 'Database error' })
                }

                res.json({ message: 'User updated successfully' })
            }
        )
    })




    app.get('/api/grave-caretakers', (req, res) => {
        try {
            let sql = `SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name,  users.email, users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE roles.name = 'grafonderhouder'
                `;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no users with this role, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No grave caretakers found' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "id": element.id,
                        "initials": element.initials,
                        "first_names": element.first_names,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "phone_number": element.phone_number,
                        "mobile_number": element.mobile_number,
                        "profile_picture_url": element.profile_picture_url,
                        "position": element.position,
                        "role": element.role_name,
                        "role_id": element.role_id
                    });
                });

                res.send({ "grave-caretakers": usersJSON });
            })
        } catch (error) {
            console.error("Error during retrieval of grave caretakers:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });


    app.get('/api/grave-owners', (req, res) => {
        try {
            let sql = `SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name, users.partner_infix, users.partner_last_name, 
            users.name_usage, users.date_of_birth, users.place_of_birth, 
            users.street_name, users.house_number, users.house_letter, 
            users.house_number_addition, users.zip_code, users.city, users.email,
            users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE roles.name = 'rechthebbende'
            `;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no users with this role, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No grave owners found' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "id": element.id,
                        "initials": element.initials,
                        "first_names": element.first_names,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "partner_infix": element.partner_infix,
                        "partner_last_name": element.partner_last_name,
                        "name_usage": element.name_usage,
                        "date_of_birth": element.date_of_birth,
                        "place_of_birth": element.place_of_birth,
                        "street_name": element.street_name,
                        "house_number": element.house_number,
                        "house_letter": element.house_letter,
                        "house_number_addition": element.house_number_addition,
                        "zip_code": element.zip_code,
                        "city": element.city,
                        "email": element.email,
                        "phone_number": element.phone_number,
                        "mobile_number": element.mobile_number,
                        "profile_picture_url": element.profile_picture_url,
                        "position": element.position,
                        "role": element.role_name,
                        "role_id": element.role_id
                    });
                });

                res.send({ "grave-owners": usersJSON });
            })
        } catch (error) {
            console.error("Error during retrieval of grave owners:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });
    
    

};