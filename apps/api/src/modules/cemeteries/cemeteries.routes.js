module.exports = function (app, conn_db) {

    app.get('/api/begraafplaatsen', (req, res) => {
        try {
            let sql = `SELECT c.id, c.name, ci.image_url, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', u.id, 'first_name', u.first_name, 'infix', u.infix, 'last_name', u.last_name)), ']') AS beheerders
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


                let begraafplaatsen = rows;
                let begraafplaatsenJSON = [];

                begraafplaatsen.forEach(element => {
                    begraafplaatsenJSON.push({
                        "id": element.id,
                        "naam": element.name,
                        "foto_url": element.image_url,
                        "beheerders": JSON.parse(element.beheerders)
                    });
                });

                res.send({ "begraafplaatsen": begraafplaatsenJSON });
            })
        } catch (error) {
            console.error("Error tijdens ophalen van begraafplaatsen:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });

}