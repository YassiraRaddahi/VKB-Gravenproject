module.exports = function (app, conn_db) {

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

}