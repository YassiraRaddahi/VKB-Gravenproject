module.exports = function (app, conn_db) {
    //const argon2 = require("argon2");
    const jwt = require("jsonwebtoken");
    const rateLimit = require("express-rate-limit");
    const isProduction = process.env.NODE_ENV === 'production';

    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: { error: "Te veel pogingen, probeer het later opnieuw" },
        standardHeaders: true,
        legacyHeaders: false,
    });

    function verifyToken(req, res, next) {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ error: "Niet ingelogd" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ error: "Ongeldig of verlopen token" });
        }
    }

    // ─── Login ───
    app.post("/api/login", loginLimiter, (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            let sql = `SELECT users.id, users.email, users.password_hash, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE users.email = ?`;

            conn_db.query(sql, [email], async function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (!rows || rows.length === 0) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }

                let user = rows[0];

                let password_correct = true;

                // let password_correct = await argon2.verify(
                //     user.password_hash,
                //     password
                // );
                if (!password_correct) {
                    return res.status(401).send({ error: "Invalid credentials" });
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email, role: user.role_name },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? 'none' : 'lax',
                    domain: isProduction
                        ? '.bram.kerkhovenbeheer.nl'
                        : undefined,
                    path: '/',
                    maxAge: 3600000, // 1 uur
                });

                res.send({ message: "Login successful" });

            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.get("/api/active-token", verifyToken, (req, res) => {
        const sql = `SELECT users.id, users.initials, users.first_name, users.infix, users.last_name, users.partner_infix, users.partner_last_name, users.name_usage, users.date_of_birth, users.place_of_birth, users.street_name, users.house_number, users.house_letter, users.house_number_addition, users.zip_code, users.city, users.email, users.phone_number, users.mobile_number, users.profile_picture_url, users.position, roles.name AS role_name
        FROM users
        JOIN role_user ON users.id = role_user.user_id
        JOIN roles ON role_user.role_id = roles.id
        WHERE users.id = ?`;

        conn_db.query(sql, [req.user.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (!rows || rows.length === 0) {
                return res.status(401).json({ error: "Gebruiker niet gevonden" });
            }

            res.json({ user: rows[0] });
        });
    });

    app.post("/api/logout", (req, res) => {

        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            domain: isProduction
                ? '.bram.kerkhovenbeheer.nl'
                : undefined,
            path: '/',
        });

        res.send({ message: "Logout successful" });
    });
};
