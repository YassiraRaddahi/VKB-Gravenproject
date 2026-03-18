module.exports = function (app, conn_db) {

    const argon2 = require('argon2');

    app.post('/api/login', (req, res) => {
        try {

            // E-mail van de gebruiker die inlogt
            let email = req.body.email;
            // Wachtwoord van de gebruiker die inlogt
            let password = req.body.password;


            // Haal benodigde informatie over de gebruiker op uit de database
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

                // Als het emailadres niet gevonden is, of er geen gebruikers zijn, geef een generieke foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }


                let user = rows[0];

                // Controleer of het opgegeven wachtwoord overeenkomt met de opgeslagen hash, anders een generieke foutmelding tonen
                let password_correct = await argon2.verify(user.password_hash, password);
                if (!password_correct) {
                    return res.status(401).send({ "error": "Invalid credentials" })
                }

                // token genereren en opslaan in de database en sturen in een response naar de client 
                //.... 

                // Voorbeeld token
                let token = "abc123";

                res.send({ "token": token, "expiresIn": 3600, "user": { "voornaam": user.first_name, "tussenvoegsel": user.infix, "achternaam": user.last_name, "e-mail": user.email, "rol": user.role_name } });
            })
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal server error' });
        }

    });

    app.post('/api/logout', (req, res) => {

        // implementatie

        res.send({ "logout": "success" });
    });
}