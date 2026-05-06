module.exports = function (app, conn_db) {

    app.get('/api/cemeteries/:cemetery_id/graves', (req, res) => {
        try {
            const cemetery_id = req.params.cemetery_id;

            let sql = `SELECT cemeteries.id as cemetery_id, cemeteries.name as cemetery_name, graves.id as grave_id, graves.grave_number, graves.type, graves.sort, graves.latitude, graves.longitude, graves.image_url, graves.remarks, graves.status, graves.last_opened_at, graves.last_cleared_at, graves.created_at, graves.updated_at
            FROM cemeteries
            LEFT JOIN graves ON cemeteries.id = graves.cemetery_id
            WHERE cemeteries.id = ?
            ORDER BY graves.grave_number ASC`;

            conn_db.query(sql, [cemetery_id], function (err, rows) {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // If the cemetery is not found, return an error
                if (!rows || rows.length === 0) {
                    return res.status(404).json({ error: 'Cemetery not found' });
                }

                let cemetery = {
                    "id": rows[0].cemetery_id,
                    "name": rows[0].cemetery_name
                };


                let graves = rows
                    .filter(row => row.grave_id !== null)
                    .map(row => ({
                        id: row.grave_id,
                        grave_number: row.grave_number,
                        type: row.type,
                        sort: row.sort,
                        status: row.status,
                        location: {
                            latitude: row.latitude,
                            longitude: row.longitude
                        },
                        image_url: row.image_url,
                        remarks: row.remarks
                    }));


                res.json({ cemetery, graves });
            })
        } catch (error) {
            console.error("Error during graves retrieval:", error);
            res.status(500).json({ error: 'Internal server error' });

        }
    });

}