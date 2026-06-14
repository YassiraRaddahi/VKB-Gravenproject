module.exports = function (app, conn_db) {  
   
   app.get('/api/admin', (req, res) => {
        try {
            let sql = `SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name,  users.email, users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
            JOIN role_user ON users.id = role_user.user_id
            JOIN roles ON role_user.role_id = roles.id
            WHERE roles.name = 'admin'
            `;

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
            console.error("Error during retrieval of admin:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

}