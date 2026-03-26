module.exports = function (app, conn_db) {

app.get('/api/users', (req, res) => {
        try {
            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
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
                        "first_name": element.first_name,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "role": element.role_name
                    });
                });

                res.send({ "users": usersJSON});
            })
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/admin', (req, res) => {
        try {
            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
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

                res.send({"admin" : {
                        "first_name": user.first_name,
                        "infix": user.infix,
                        "last_name": user.last_name,
                        "email": user.email,
                        "role": user.role_name
                    }});
            })
        } catch (error) {
            console.error("Error during retrieval of admin:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/cemetery-managers', (req, res) => {
        try {
            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, profile_picture_url, roles.name AS role_name
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

                // If there are no users with this role, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No managers found' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "first_name": element.first_name,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "zip_code": element.zip_code,
                        "city": element.city,
                        "email": element.email,
                        "phone_number": element.phone_number,
                        "profile_picture_url": element.profile_picture_url,
                        "role": element.role_name
                    });
                });

                res.send({ "cemetery-managers": usersJSON});
            })
        } catch (error) {
            console.error("Error during retrieval of managers:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });


    app.get('/api/grave-caretaker', (req, res) => {
        try {
            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
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
                        "first_name": element.first_name,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "role": element.role_name
                    });
                });

                res.send({ "grave-caretakers": usersJSON});
            })
        } catch (error) {
            console.error("Error during retrieval of grave caretakers:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });


    app.get('/api/grave-owner', (req, res) => {
        try {
            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.city, users.email, users.phone_number, users.relation_to_deceased, roles.name AS role_name
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
                        "first_name": element.first_name,
                        "infix": element.infix,
                        "last_name": element.last_name,
                        "email": element.email,
                        "role": element.role_name
                    });
                });

                res.send({ "grave-owners": usersJSON});
            })
        } catch (error) {
            console.error("Error during retrieval of grave owners:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

 
    
   
}