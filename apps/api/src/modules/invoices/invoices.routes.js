const { buildInvoicePdf } = require("./invoice.pdf.js");

module.exports = function (app, conn_db) {
  // =====================================================
  // GET ALL INVOICES
  // =====================================================
  app.get("/api/invoices", (req, res) => {
    const sql = `
            SELECT
                i.id,
                i.invoice_number,
                i.amount,
                i.status,
                i.issued_at,
                i.due_date,
                i.paid_at,
                i.user_id,
                i.grave_id,
                i.grave_right_id,
                u.first_names,
                u.infix,
                u.last_name,
                g.grave_number,
                gr.contract_number
            FROM invoices i
            LEFT JOIN users u ON i.user_id = u.id
            LEFT JOIN graves g ON i.grave_id = g.id
            LEFT JOIN grave_rights gr ON i.grave_right_id = gr.id
            ORDER BY i.issued_at DESC
        `;

    conn_db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }

      res.json({ invoices: rows });
    });
  });

  // =====================================================
  // DOWNLOAD A SINGLE INVOICE AS PDF
  // =====================================================
  app.get("/api/invoices/:id/pdf", (req, res) => {
    const { id } = req.params;

    const sql = `
            SELECT
                i.id,
                i.invoice_number,
                i.amount,
                i.status,
                i.issued_at,
                i.due_date,
                i.paid_at,
                u.first_names,
                u.infix,
                u.last_name,
                g.grave_number,
                gr.contract_number
            FROM invoices i
            LEFT JOIN users u ON i.user_id = u.id
            LEFT JOIN graves g ON i.grave_id = g.id
            LEFT JOIN grave_rights gr ON i.grave_right_id = gr.id
            WHERE i.id = ?
        `;

    conn_db.query(sql, [id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      if (!rows.length) {
        return res.status(404).json({ error: "Factuur niet gevonden" });
      }

      const invoice = rows[0];

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${invoice.invoice_number}.pdf"`
      );

      const doc = buildInvoicePdf(invoice);
      doc.pipe(res);
    });
  });


  // =====================================================
  // CREATE INVOICE FROM A GRAVE RIGHT (NOG NIET WERKEND)
  // =====================================================
  app.post("/api/invoices", (req, res) => {
    const { grave_right_id } = req.body;

    if (!grave_right_id) {
      return res.status(400).json({ error: "grave_right_id is verplicht" });
    }

    conn_db.query(
      "SELECT * FROM grave_rights WHERE id = ?",
      [grave_right_id],
      (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "DB error" });
        }
        if (!rows.length) {
          return res.status(404).json({ error: "Grafrecht niet gevonden" });
        }

        const right = rows[0];

        const amount = Number(right.amount_total);

        const year = new Date().getFullYear();
        const prefix = `factuur_${year}_`;

        conn_db.query(
          `SELECT invoice_number FROM invoices
                 WHERE invoice_number LIKE ?
                 ORDER BY invoice_number DESC
                 LIMIT 1`,
          [`${prefix}%`],
          (err2, last) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ error: "DB error" });
            }

            let next = 1;
            if (last.length) {
              const lastSeq = parseInt(
                last[0].invoice_number.slice(prefix.length),
                10
              );
              if (!Number.isNaN(lastSeq)) next = lastSeq + 1;
            }
            const invoiceNumber = prefix + String(next).padStart(4, "0");

            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);
            const due = dueDate.toISOString().slice(0, 10);

            conn_db.query(
              `INSERT INTO invoices
                            (user_id, grave_id, grave_right_id, invoice_number, amount, status, due_date)
                         VALUES (?, ?, ?, ?, ?, 'open', ?)`,
              [
                right.user_id,
                right.grave_id,
                right.id,
                invoiceNumber,
                amount,
                due,
              ],
              (err3, result) => {
                if (err3) {
                  console.error(err3);
                  return res.status(500).json({ error: "DB error" });
                }

                res.status(201).json({
                  invoice: {
                    id: result.insertId,
                    user_id: right.user_id,
                    grave_id: right.grave_id,
                    grave_right_id: right.id,
                    invoice_number: invoiceNumber,
                    amount,
                    status: "open",
                    due_date: due,
                  },
                });
              }
            );
          }
        );
      }
    );
  });
};
