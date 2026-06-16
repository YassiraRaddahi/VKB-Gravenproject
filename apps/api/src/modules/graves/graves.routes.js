module.exports = function (app, conn_db) {

    // =========================
    // ALL GRAVES BY CEMETERY
    // =========================
    app.get('/api/cemeteries/:cemetery_id/graves', (req, res) => {

        const sql = `
            SELECT
                cemeteries.id AS cemetery_id,
                cemeteries.name AS cemetery_name,
                graves.id AS grave_id,
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

        conn_db.query(sql, [req.params.cemetery_id], (err, rows) => {

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
    // SINGLE GRAVE + DIMENSIONS
    // =========================
    app.get('/api/graves/:grave_id', (req, res) => {

        const sql = `
            SELECT 
                graves.*,
                graves_dimensions.length,
                graves_dimensions.width
            FROM graves
            LEFT JOIN graves_dimensions
                ON graves.id = graves_dimensions.grave_id
            WHERE graves.id = ?
            LIMIT 1
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
    // UPDATE GRAVE + DIMENSIONS (UPSERT)
    // =========================
    app.put('/api/graves/:grave_id', (req, res) => {

        const id = req.params.grave_id

        const {
            grave_number,
            type,
            sort,
            status,
            remarks,
            width = null,
            length = null
        } = req.body

        // 1. UPDATE graves
        const sqlGraves = `
            UPDATE graves
            SET grave_number = ?,
                type = ?,
                sort = ?,
                status = ?,
                remarks = ?
            WHERE id = ?
        `

        conn_db.query(sqlGraves, [
            grave_number,
            type,
            sort,
            status,
            remarks,
            id
        ], (err) => {

            if (err) return res.status(500).json({ error: err })

            // 2. UPSERT dimensions
            const sqlDim = `
                INSERT INTO graves_dimensions (grave_id, width, length)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    width = VALUES(width),
                    length = VALUES(length)
            `

            conn_db.query(sqlDim, [
                id,
                width,
                length
            ], (err2) => {

                if (err2) return res.status(500).json({ error: err2 })

                res.json({ success: true })
            })
        })
    })
}