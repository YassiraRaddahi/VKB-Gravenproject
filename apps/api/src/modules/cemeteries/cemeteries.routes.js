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
                        "image_url": element.image_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlZW4gYWZiZWVsZGluZzwvdGV4dD48L3N2Zz4=',
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

}