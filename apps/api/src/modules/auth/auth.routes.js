module.exports = function (app, conn_db) {

    const argon2 = require('argon2')
    const jwt = require('jsonwebtoken')
    const rateLimit = require('express-rate-limit')

    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: { error: 'Te veel pogingen, probeer het later opnieuw' },
        standardHeaders: true,
        legacyHeaders: false,
    })

    function verifyToken(req, res, next) {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ error: 'Niet ingelogd' })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded 
            next()
        } catch (err) {
            return res.status(401).json({ error: 'Ongeldig of verlopen token' })
        }
    }

    // ─── Login ───
    app.post('/api/login', loginLimiter, (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            let sql = `SELECT users.id, users.first_name, users.last_name, users.email, users.password_hash, roles.name AS role_name
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
                    return res.status(401).send({ error: "Invalid credentials" })
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email, role: user.role_name },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600000 // 1 uur
                })

                res.send({
                    user: {
                        id: user.id,
                        first_name: user.first_name,
                        infix: user.infix,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role_name
                    }
                });
            })
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    });

    
    app.get('/api/current-user', verifyToken, (req, res) => {
        res.json({ user: req.user })
    })

    app.post('/api/logout', (req, res) => {

        // implementation

        res.send({ "logout": "success" });
    });
}