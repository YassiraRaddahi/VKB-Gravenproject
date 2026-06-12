module.exports = function (app, conn_db) {

    // =========================
    // ALL GRAVES BY CEMETERY
    // =========================
    app.get('/api/cemeteries/:cemetery_id/graves', (req, res) => {

        const cemetery_id = req.params.cemetery_id

        const sql = `
            SELECT
                cemeteries.id as cemetery_id,
                cemeteries.name as cemetery_name,
                graves.id as grave_id,
                graves.grave_number,
                graves.type,
                graves.sort,
                graves.latitude,
                graves.longitude,
                graves.image_url,
                graves.remarks,
                graves.status,
                graves.last_opened_at,
                graves.last_cleared_at,
                graves.created_at,
                graves.updated_at
            FROM cemeteries
            LEFT JOIN graves
                ON cemeteries.id = graves.cemetery_id
            WHERE cemeteries.id = ?
            ORDER BY graves.grave_number ASC
        `

        conn_db.query(sql, [cemetery_id], (err, rows) => {

            if (err) return res.status(500).json({ error: 'Database error' })

            if (!rows || rows.length === 0) {
                return res.status(404).json({ error: 'Cemetery not found' })
            }

            const cemetery = {
                id: rows[0].cemetery_id,
                name: rows[0].cemetery_name
            }

            const graves = rows
                .filter(r => r.grave_id !== null)
                .map(r => ({
                    id: r.grave_id,
                    grave_number: r.grave_number,
                    type: r.type,
                    sort: r.sort,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    image_url: r.image_url,
                    remarks: r.remarks,
                    status: r.status,
                    last_opened_at: r.last_opened_at,
                    last_cleared_at: r.last_cleared_at,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                }))

            res.json({ cemetery, graves })
        })
    })


    // =========================
    // SINGLE GRAVE
    // =========================
    app.get('/api/graves/:grave_id', (req, res) => {

        const sql = `
            SELECT * FROM graves WHERE id = ? LIMIT 1
        `

        conn_db.query(sql, [req.params.grave_id], (err, rows) => {

            if (err) return res.status(500).json({ error: 'Database error' })

            if (!rows.length) {
                return res.status(404).json({ error: 'Grave not found' })
            }

            res.json({ grave: rows[0] })
        })
    })


    // =========================
    // UPDATE GRAVE (EDIT ENABLED)
    // =========================
    app.put('/api/graves/:grave_id', (req, res) => {

    const id = req.params.grave_id

    const {
        grave_number,
        type,
        sort,
        status,
        remarks
    } = req.body

    const sql = `
        UPDATE graves
        SET grave_number = ?,
            type = ?,
            sort = ?,
            status = ?,
            remarks = ?
        WHERE id = ?
    `

    conn_db.query(sql, [
        grave_number,
        type,
        sort,
        status,
        remarks,
        id
    ], (err) => {

        if (err) {
            return res.status(500).json({ error: err })
        }

        res.json({ success: true })
    })
})
}