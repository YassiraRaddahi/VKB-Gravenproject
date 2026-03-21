module.exports = function (app, conn_db) {

    app.get('/api/graven', (req, res) => {
        try {
            const { cemetery_id } = req.query

            let sql = `SELECT graves.id, graves.grave_number, graves.type, graves.sort, graves.latitude, graves.longitude, graves.image_url, graves.remarks, graves.status, graves.last_opened_at, graves.last_cleared_at, graves.created_at, graves.updated_at
            FROM graves
            JOIN cemeteries ON graves.cemetery_id = cemeteries.id
            WHERE graves.cemetery_id = ?`;

            conn_db.query(sql, [cemetery_id], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Als er geen graven zijn, geef een foutmelding
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Geen graven gevonden' });
                }


                let graven = rows;
                let gravenJSON = [];

                graven.forEach(element => {
                    gravenJSON.push({
                        "graf_nummer": element.grave_number,
                        "type": element.type,
                        "soort": element.sort,
                        "status": element.status,
                        "locatie": {
                            "latitude": element.latitude,
                            "longitude": element.longitude
                        },
                        "foto_url": element.image_url,
                        "opmerkingen": element.remarks,
                    });
                });

                res.send({ "graven": gravenJSON });
            })
        } catch (error) {
            console.error("Error tijdens ophalen van graven:", error);
            res.status(500).json({ error: 'Interne server error' });

        }
    });

}