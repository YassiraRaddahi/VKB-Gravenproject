module.exports = function (app, conn_db) {

    app.get('/api/graves/:cemetery_id', (req, res) => {
        try {
            const cemetery_id = req.params.cemetery_id;

            let sql = `SELECT graves.id, graves.grave_number, graves.type, graves.sort, graves.latitude, graves.longitude, graves.image_url, graves.remarks, graves.status, graves.last_opened_at, graves.last_cleared_at, graves.created_at, graves.updated_at
            FROM graves
            JOIN cemeteries ON graves.cemetery_id = cemeteries.id
            WHERE graves.cemetery_id = ?`;

            conn_db.query(sql, [cemetery_id], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If there are no graves for this cemetery, return an error message
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'No graves found' });
                }


                let graven = rows;
                let gravenJSON = [];

                graven.forEach(element => {
                    gravenJSON.push({
                        "grave_number": element.grave_number,
                        "type": element.type,
                        "sort": element.sort,
                        "status": element.status,
                        "location": {
                            "latitude": element.latitude,
                            "longitude": element.longitude
                        },
                        "image_url": element.image_url,
                        "remarks": element.remarks,
                    });
                });

                res.send({ "graves": gravenJSON });
            })
        } catch (error) {
            console.error("Error during graves retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

}