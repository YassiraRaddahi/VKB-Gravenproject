module.exports = function (app, conn_db) {

    app.get('/api/cemeteries', (req, res) => {
        try {
            let sql = `SELECT c.id, c.name, c.city, ci.image_url, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', u.id, 'first_name', u.first_name, 'infix', u.infix, 'last_name', u.last_name)), ']') AS cemetery_managers
                FROM cemeteries AS c
                LEFT JOIN cemetery_images AS ci ON c.id = ci.cemetery_id
                LEFT JOIN cemetery_manager AS cm ON c.id = cm.cemetery_id
                LEFT JOIN users AS u ON cm.user_id = u.id
                GROUP BY c.id`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no cemeteries, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No cemeteries found' });
                }


                let cemeteries = rows;
                let cemeteriesJSON = [];

                cemeteries.forEach(element => {
                    let managers = [];
                    if (element.cemetery_managers) {
                        try {
                            managers = JSON.parse(element.cemetery_managers);
                        } catch (e) {
                            managers = [];
                        }
                    }

                    cemeteriesJSON.push({
                        "id": element.id,
                        "name": element.name,
                        "city": element.city,
                        "image_url": element.image_url,
                        "cemetery_managers": managers
                    });
                });

                res.send({ "cemeteries": cemeteriesJSON });
            })
        } catch (error) {
            console.error("Error during cemeteries retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

    app.get('/api/cemeteries/:id', (req, res) => {
        try {
            const cemeteryId = req.params.id;
            let sql = `SELECT c.id, c.name, c.city, c.address, c.zip_code, c.email, c.phone_number, c.website_url, c.remarks, ci.image_url, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', u.id, 'first_name', u.first_name, 'infix', u.infix, 'last_name', u.last_name)), ']') AS cemetery_managers
                FROM cemeteries AS c
                LEFT JOIN cemetery_images AS ci ON c.id = ci.cemetery_id
                LEFT JOIN cemetery_manager AS cm ON c.id = cm.cemetery_id
                LEFT JOIN users AS u ON cm.user_id = u.id
                WHERE c.id = ?
                GROUP BY c.id`;

            conn_db.query(sql, [cemeteryId], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Cemetery not found' });
                }

                let cemetery = rows[0];
                let managers = [];
                if (cemetery.cemetery_managers) {
                    try {
                        managers = JSON.parse(cemetery.cemetery_managers);
                    } catch (e) {
                        managers = [];
                    }
                }

                res.send({
                    "cemetery": {
                        "id": cemetery.id,
                        "name": cemetery.name,
                        "city": cemetery.city,
                        "address": cemetery.address,
                        "zip_code": cemetery.zip_code,
                        "email": cemetery.email,
                        "phone_number": cemetery.phone_number,
                        "website_url": cemetery.website_url,
                        "remarks": cemetery.remarks,
                        "image_url": cemetery.image_url,
                        "cemetery_managers": managers
                    }
                });
            });
        } catch (error) {
            console.error("Error during cemetery retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.put('/api/cemeteries/:id', (req, res) => {
        try {
            const cemeteryId = req.params.id;
            const { name, city, address, zip_code, email, phone_number, website_url, remarks } = req.body;

            let sql = `UPDATE cemeteries
                SET name = ?, city = ?, address = ?, zip_code = ?, email = ?, phone_number = ?, website_url = ?, remarks = ?
                WHERE id = ?`;

            conn_db.query(sql, [name, city, address, zip_code, email, phone_number, website_url, remarks, cemeteryId], function (err, result) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Cemetery not found' });
                }

                res.status(200).json({ message: 'Cemetery updated successfully' });
            });
        } catch (error) {
            console.error("Error during cemetery update:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

}