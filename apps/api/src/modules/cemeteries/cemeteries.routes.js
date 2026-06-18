const fs = require("fs");
const path = require("path");
const { encryptIBAN, decryptIBAN } = require("../../utils/encrypt");

module.exports = function (app, conn_db) {
  // =====================================================
  // GET ALL CEMETERIES
  // =====================================================
  app.get("/api/cemeteries", (req, res) => {
    const sql = `
            SELECT
                c.id,
                c.name,
                c.city,
                ci.image_url,
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'id', u.id,
                        'first_names', u.first_names,
                        'infix', u.infix,
                        'last_name', u.last_name
                    )
                ) AS cemetery_managers
            FROM cemeteries c
            LEFT JOIN cemetery_images ci ON c.id = ci.cemetery_id
            LEFT JOIN cemetery_manager cm ON c.id = cm.cemetery_id
            LEFT JOIN users u ON cm.user_id = u.id
            GROUP BY c.id
        `;

    conn_db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }

      res.json({
        cemeteries: rows.map((r) => ({
          id: r.id,
          name: r.name,
          city: r.city,
          image_url: r.image_url,
          cemetery_managers: r.cemetery_managers
            ? JSON.parse(`[${r.cemetery_managers}]`)
            : [],
        })),
      });
    });
  });

  // =====================================================
  // GET CEMETERY BY ID
  // =====================================================
  app.get("/api/cemeteries/:id", (req, res) => {
    const sql = `
            SELECT
                c.*,
                ci.image_url,
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'id', u.id,
                        'first_names', u.first_names,
                        'infix', u.infix,
                        'last_name', u.last_name
                    )
                ) AS cemetery_managers
            FROM cemeteries c
            LEFT JOIN cemetery_images ci ON c.id = ci.cemetery_id
            LEFT JOIN cemetery_manager cm ON c.id = cm.cemetery_id
            LEFT JOIN users u ON cm.user_id = u.id
            WHERE c.id = ?
            GROUP BY c.id
        `;

    conn_db.query(sql, [req.params.id], (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      if (!rows.length) return res.status(404).json({ error: "Not found" });

      const row = rows[0];

      let iban = null;

      if (row.iban_iv && row.iban_encrypted && row.iban_tag) {
        try {
          iban = decryptIBAN(row.iban_iv, row.iban_encrypted, row.iban_tag);
        } catch (e) {
          console.error(e);
        }
      }

      res.json({
        cemetery: {
          id: row.id,
          name: row.name,
          city: row.city,
          street_name: row.street_name,
          house_number: row.house_number,
          house_letter: row.house_letter,
          house_number_addition: row.house_number_addition,
          zip_code: row.zip_code,
          email: row.email,
          phone_number: row.phone_number,
          website_url: row.website_url,
          remarks: row.remarks,
          image_url: row.image_url,
          iban,
          cemetery_managers: row.cemetery_managers
            ? JSON.parse(`[${row.cemetery_managers}]`)
            : [],
        },
      });
    });
  });

  // =====================================================
  // UPDATE CEMETERY
  // =====================================================
  app.put("/api/cemeteries/:id", (req, res) => {
    const {
      name,
      city,
      street_name,
      house_number,
      house_letter,
      house_number_addition,
      zip_code,
      email,
      phone_number,
      website_url,
      remarks,
      iban,
    } = req.body;

    let iban_iv = null;
    let iban_encrypted = null;
    let iban_tag = null;

    if (iban) {
      const enc = encryptIBAN(iban);
      iban_iv = enc.iv;
      iban_encrypted = enc.encrypted;
      iban_tag = enc.tag;
    }

    const sql = `
            UPDATE cemeteries
            SET
                name = ?,
                city = ?,
                street_name = ?,
                house_number = ?,
                house_letter = ?,
                house_number_addition = ?,
                zip_code = ?,
                email = ?,
                phone_number = ?,
                website_url = ?,
                remarks = ?,
                iban_iv = ?,
                iban_encrypted = ?,
                iban_tag = ?
            WHERE id = ?
        `;

    conn_db.query(
      sql,
      [
        name,
        city,
        street_name,
        house_number,
        house_letter,
        house_number_addition,
        zip_code,
        email,
        phone_number,
        website_url,
        remarks,
        iban_iv,
        iban_encrypted,
        iban_tag,
        req.params.id,
      ],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "DB error" });
        }

        res.json({ message: "Updated" });
      }
    );
  });

  // =====================================================
  // UPDATE MANAGERS
  // =====================================================
  app.put("/api/cemeteries/:id/managers", (req, res) => {
    const { manager_ids } = req.body;

    conn_db.query(
      "DELETE FROM cemetery_manager WHERE cemetery_id = ?",
      [req.params.id],
      (err) => {
        if (err) return res.status(500).json({ error: err });

        if (!manager_ids?.length) {
          return res.json({ message: "ok" });
        }

        const values = manager_ids.map((id) => [id, req.params.id]);

        conn_db.query(
          "INSERT INTO cemetery_manager (user_id, cemetery_id) VALUES ?",
          [values],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2 });
            res.json({ message: "ok" });
          }
        );
      }
    );
  });

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================
  app.post("/api/cemeteries/:id/image", (req, res) => {
    const { file_name, data } = req.body;

    const buffer = Buffer.from(data, "base64");

    const folder = path.resolve(
      __dirname,
      "../../../../web/public/images/cemeteries"
    );

    fs.mkdirSync(folder, { recursive: true });

    const safe = file_name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const file = `${req.params.id}-${Date.now()}-${safe}`;
    const filePath = path.join(folder, file);

    fs.writeFileSync(filePath, buffer);

    const url = `/images/cemeteries/${file}`;

    conn_db.query(
      "UPDATE cemetery_images SET image_url = ? WHERE cemetery_id = ?",
      [url, req.params.id],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });

                if (!result.affectedRows) {
                    conn_db.query(
                        'INSERT INTO cemetery_images (cemetery_id, image_url) VALUES (?, ?)',
                        [req.params.id, url],
                        () => res.json({ image_url: url })
                    );
                } else {
                    res.json({ image_url: url });
                }
            }
        );
    });
    // =====================================================
// CREATE CEMETERY
// =====================================================
app.post('/api/cemeteries/add', (req, res) => {
    const {
        name,
        city,
        street_name,
        house_number,
        house_letter,
        house_number_addition,
        zip_code,
        email,
        phone_number,
        website_url,
        remarks,
        municipality_id
    } = req.body;

    const sql = `
        INSERT INTO cemeteries (
            name,
            city,
            street_name,
            house_number,
            house_letter,
            house_number_addition,
            zip_code,
            email,
            phone_number,
            website_url,
            remarks,
            municipality_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conn_db.query(sql, [
        name,
        city,
        street_name,
        house_number || null,
        house_letter || null,
        house_number_addition || null,
        zip_code,
        email || null,
        phone_number || null,
        website_url || null,
        remarks || null,
        municipality_id
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'DB error' });
        }

        res.status(201).json({
            message: 'Created',
            id: result.insertId
        });
    });
});

};
