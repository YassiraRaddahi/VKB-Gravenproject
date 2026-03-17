module.exports = function (app) {

    const conn_db = require('./db_conn');
    const argon2 = require('argon2');

    app.get('/api/home', (req, res) => {
        res.send({'message': 'Homepagina informatie uit database'});
    });


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

                // Als er geen gebruikers zijn, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen gebruikers gevonden' });
                }


                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "voornaam": element.first_name,
                        "tussenvoegsel": element.infix,
                        "achternaam": element.last_name,
                        "e-mail": element.email,
                        "rol": element.role_name
                    });
                });

                res.send({ "users": usersJSON});
            })
        } catch (error) {
            console.error("Error tijdens login:", error);
            res.status(500).json({ error: 'Interne server error' });

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

                // Als er geen gebruiker is met deze rol, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen admin gevonden' });
                }

                let user = rows[0];

                res.send({"admin" : {
                        "voornaam": user.first_name,
                        "tussenvoegsel": user.infix,
                        "achternaam": user.last_name,
                        "e-mail": user.email,
                        "rol": user.role_name
                    }});
            })
        } catch (error) {
            console.error("Error tijdens ophalen van users:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });

    app.get('/api/beheerders', (req, res) => {
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

                // Als er geen gebruikers zijn met deze rol, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen beheerders gevonden' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "voornaam": element.first_name,
                        "tussenvoegsel": element.infix,
                        "achternaam": element.last_name,
                        "postcode": element.zip_code,
                        "stad": element.city,
                        "e-mail": element.email,
                        "telefoonnummer": element.phone_number,
                        "foto_url": element.profile_picture_url,
                        "rol": element.role_name
                    });
                });

                res.send({ "beheerders": usersJSON});
            })
        } catch (error) {
            console.error("Error tijdens ophalen van beheerders:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });


    app.get('/api/grafonderhouders', (req, res) => {
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

                // Als er geen gebruikers zijn met deze rol, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen grafonderhouders gevonden' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "voornaam": element.first_name,
                        "tussenvoegsel": element.infix,
                        "achternaam": element.last_name,
                        "e-mail": element.email,
                        "rol": element.role_name
                    });
                });

                res.send({ "grafonderhouders": usersJSON});
            })
        } catch (error) {
            console.error("Error tijdens ophalen van grafonderhouders:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });


    app.get('/api/rechthebbenden', (req, res) => {
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

                // Als er geen gebruikers zijn met deze rol, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen rechthebbenden gevonden' });
                }

                let users = rows;
                let usersJSON = [];

                users.forEach(element => {
                    usersJSON.push({
                        "voornaam": element.first_name,
                        "tussenvoegsel": element.infix,
                        "achternaam": element.last_name,
                        "e-mail": element.email,
                        "rol": element.role_name
                    });
                });

                res.send({ "rechthebbenden": usersJSON});
            })
        } catch (error) {
            console.error("Error tijdens ophalen van rechthebbenden:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });

 
    app.get('/api/begraafplaatsen', (req, res) => {
        try {
            let sql = `SELECT c.id, c.name, c.image_url, u.first_name, u.infix, u.last_name
                FROM cemeteries AS c
                JOIN cemetery_manager AS cm ON c.id = cm.cemetery_id
                JOIN users AS u ON cm.user_id= u.id`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Als er geen begraafplaatsen zijn, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen begraafplaatsen gevonden' });
                }


                let begraafplaatsen = rows;
                let begraafplaatsenJSON = [];

                begraafplaatsen.forEach(element => {
                    begraafplaatsenJSON.push({
                        "id": element.id,
                        "naam": element.name,
                        "foto_url": element.image_url,
                        "beheerder": {
                            "voornaam": element.first_name,
                            "tussenvoegsel": element.infix,
                            "achternaam": element.last_name
                        }
                    });
                });

                res.send({ "begraafplaatsen": begraafplaatsenJSON});
            })
        } catch (error) {
            console.error("Error tijdens ophalen van begraafplaatsen:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });
   
}