module.exports = function (app, conn_db) {

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
}