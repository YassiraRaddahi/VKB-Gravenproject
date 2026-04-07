module.exports = function (app, conn_db) {

    const argon2 = require('argon2')
    const jwt = require('jsonwebtoken')
    const rateLimit = require('express-rate-limit')

    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minuten
        max: 5,                    // max 5 pogingen
        message: { error: 'Te veel pogingen, probeer het later opnieuw' },
        standardHeaders: true,
        legacyHeaders: false,
    })
   
    app.post('/api/login', loginLimiter, (req, res) => {
        try {

            let email = req.body.email;
            let password = req.body.password;

            let sql = `SELECT users.first_name, users.last_name, users.email, users.password_hash, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE users.email = ?`;
            conn_db.query(sql, [email], async function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (!rows || rows.length === 0) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                let user = rows[0];

                let password_correct = await argon2.verify(user.password_hash, password);
                if (!password_correct) {
                    return res.status(401).send({ "error": "Invalid credentials" })
                }

    
                const token = jwt.sign(
                    { email: user.email, role: user.role_name },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                  )

                  res.cookie('token', token, {
                    httpOnly: true,      // JavaScript kan er niet bij
                    secure: true,        // Alleen via HTTPS
                    sameSite: 'strict',  // Bescherming tegen CSRF
                    maxAge: 3600000      
                })
                res.send({
                    "user":
                    {
                        "first_name": user.first_name,
                        "infix": user.infix,
                        "last_name": user.last_name,
                        "email": user.email,
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