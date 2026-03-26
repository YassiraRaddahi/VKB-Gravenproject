module.exports = function (app, conn_db) {

    app.get('/api/cemeteries', (req, res) => {
        try {
            let sql = `SELECT c.id, c.name, ci.image_url, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', u.id, 'first_name', u.first_name, 'infix', u.infix, 'last_name', u.last_name)), ']') AS cemetery_managers
                FROM cemeteries AS c
                JOIN cemetery_images AS ci ON c.id = ci.cemetery_id
                JOIN cemetery_manager AS cm ON c.id = cm.cemetery_id
                JOIN users AS u ON cm.user_id= u.id
                GROUP BY c.id`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Als er geen begraafplaatsen zijn, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen begraafplaatsen gevonden' });
                }


                let cemeteries = rows;
                let cemeteriesJSON = [];

                cemeteries.forEach(element => {
                    cemeteriesJSON.push({
                        "id": element.id,
                        "name": element.name,
                        "image_url": element.image_url,
                        "cemetery_managers": JSON.parse(element.cemetery_managers)
                    });
                });

                res.send({ "cemeteries": cemeteriesJSON });
            })
        } catch (error) {
            console.error("Error during cemeteries retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

}