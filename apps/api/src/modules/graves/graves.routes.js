module.exports = function (app, conn_db) {

    app.get('/api/graven', (req, res) => {
        try {
            let sql = `SELECT graves.id, graves.grave_number, graves.type, graves.sort, graves.latitude, graves.longitude, graves.image_hash_url, graves.remarks, graves.grave_right_start, graves.grave_right_end, graves.created_at, graves.updated_at 
            FROM graves
            JOIN statuses ON graves.status_id = statuses.id
            JOIN cemeteries ON graves.cemetery_id = cemeteries.id
            LEFT JOIN cleanups ON graves.last_cleanup_id = cleanups.id`;

            conn_db.query(sql, function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Als er geen begraafplaatsen zijn, geef een foutmelding
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
                    "locatie": {
                        "latitude": element.latitude,
                        "longitude": element.longitude
                    },
                    "foto_url": element.image_hash_url,
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