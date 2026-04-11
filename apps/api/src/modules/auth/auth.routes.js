module.exports = function (app, conn_db) {

    const argon2 = require('argon2');

    app.post('/api/login', (req, res) => {
        try {

            let email = req.body.email;
            let password = req.body.password;

            let sql = `SELECT users.first_name, users.infix, users.last_name, users.address, users.zip_code, users.city, users.email, users.phone_number, users.profile_picture_url, users.password_hash, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE users.email = ?`;
            conn_db.query(sql, [email], async function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If the email does not exist in the database return a generic error message
                if (!rows || rows.length === 0) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }


                let user = rows[0];

                // Check if the provided password matches the stored hash, otherwise return a generic error message
                let password_correct = await argon2.verify(user.password_hash, password);
                if (!password_correct) {
                    return res.status(401).send({ "error": "Invalid credentials" })
                }

                // If the credentials are correct, generate a token, store it in the database and send it in a response to the client
                //.... 

                // Examlple of a token
                let token = "abc123";

                res.send({
                    "token": token,
                    "expiresIn": 3600,
                    "user":
                    {
                        "first_name": user.first_name,
                        "infix": user.infix,
                        "last_name": user.last_name,
                        "address": user.address,
                        "zip_code": user.zip_code,
                        "city": user.city,
                        "email": user.email,
                        "phone_number": user.phone_number,
                        "profile_picture_url": user.profile_picture_url,
                        "role": user.role_name
                    }
                });
            })
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal server error' });
        }

    });

    app.post('/api/logout', (req, res) => {

        // implementation

        res.send({ "logout": "success" });
    });
}