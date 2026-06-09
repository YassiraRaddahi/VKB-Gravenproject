const {
  uploadImage,
  saveImage,
  deleteImage,
} = require("../../utils/imageStore.js");

module.exports = function (app, conn_db) {
  // =========================
  // ALL GRAVES BY CEMETERY
  // =========================
  app.get("/api/cemeteries/:cemetery_id/graves", (req, res) => {
    const cemetery_id = req.params.cemetery_id;

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
        `;

    conn_db.query(sql, [cemetery_id], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "Cemetery not found" });
      }

      const cemetery = {
        id: rows[0].cemetery_id,
        name: rows[0].cemetery_name,
      };

      const graves = rows
        .filter((r) => r.grave_id !== null)
        .map((r) => ({
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
          updated_at: r.updated_at,
        }));

      res.json({ cemetery, graves });
    });
  });

  // =========================
  // SINGLE GRAVE
  // =========================
  app.get("/api/graves/:grave_id", (req, res) => {
    const sql = `
            SELECT * FROM graves WHERE id = ? LIMIT 1
        `;

    conn_db.query(sql, [req.params.grave_id], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (!rows.length) {
        return res.status(404).json({ error: "Grave not found" });
      }

      res.json({ grave: rows[0] });
    });
  });

  // =========================
  // CREATE GRAVE
  // =========================
  app.post("/api/cemeteries/:cemetery_id/graves", (req, res) => {
    uploadImage(req, res, (uploadErr) => {
      if (uploadErr) {
        return res.status(400).json({ error: uploadErr.message });
      }

      const cemetery_id = req.params.cemetery_id;

      const { grave_number, type, sort, status, latitude, longitude, remarks } =
        req.body;

      const checkSql = `
            SELECT id FROM graves
            WHERE cemetery_id = ? AND grave_number = ?
            LIMIT 1
        `;

      conn_db.query(
        checkSql,
        [cemetery_id, grave_number],
        async (checkErr, existing) => {
          if (checkErr) {
            return res.status(500).json({ error: "Database error" });
          }

          if (existing.length > 0) {
            return res.status(409).json({
              error: "Dit grafnummer bestaat al op dit kerkhof.",
            });
          }

          let image_url = null;
          try {
            image_url = await saveImage(req.file, "graves");
          } catch (imgErr) {
            return res
              .status(500)
              .json({ error: "Afbeelding verwerken mislukt" });
          }

          const sql = `
                INSERT INTO graves
                    (cemetery_id, grave_number, type, sort, status, latitude, longitude, image_url, remarks)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

          conn_db.query(
            sql,
            [
              cemetery_id,
              grave_number,
              type,
              sort,
              status,
              latitude || null,
              longitude || null,
              image_url,
              remarks,
            ],
            (err, result) => {
              if (err) {
                deleteImage(image_url); // ruim het net opgeslagen bestand op
                return res.status(500).json({ error: "Database error" });
              }

              res
                .status(201)
                .json({ success: true, grave_id: result.insertId });
            }
          );
        }
      );
    });
  });

  // =========================
  // UPDATE GRAVE (EDIT ENABLED)
  // =========================
  app.put("/api/graves/:grave_id", (req, res) => {
    uploadImage(req, res, (uploadErr) => {
      if (uploadErr) {
        return res.status(400).json({ error: uploadErr.message });
      }

      const id = req.params.grave_id;
      const { grave_number, type, sort, status, remarks } = req.body;

      conn_db.query(
        "SELECT image_url FROM graves WHERE id = ? LIMIT 1",
        [id],
        async (selErr, rows) => {
          if (selErr) return res.status(500).json({ error: "Database error" });
          if (!rows.length) {
            return res.status(404).json({ error: "Grave not found" });
          }

          const oldImageUrl = rows[0].image_url;

          let newImageUrl = null;
          if (req.file) {
            try {
              newImageUrl = await saveImage(req.file, "graves");
            } catch (imgErr) {
              return res
                .status(500)
                .json({ error: "Afbeelding verwerken mislukt" });
            }
          }

          const image_url = newImageUrl || oldImageUrl;

          const sql = `
              UPDATE graves
              SET grave_number = ?,
                  type = ?,
                  sort = ?,
                  status = ?,
                  remarks = ?,
                  image_url = ?
              WHERE id = ?
          `;

          conn_db.query(
            sql,
            [grave_number, type, sort, status, remarks, image_url, id],
            (err) => {
              if (err) {
                if (newImageUrl) deleteImage(newImageUrl);
                return res.status(500).json({ error: err });
              }

              // Pas na een geslaagde update het oude afbeelding verwijderen.
              if (newImageUrl) deleteImage(oldImageUrl);

              res.json({ success: true });
            }
          );
        }
      );
    });
  });
};
