const PDFDocument = require("pdfkit");

// =====================================================
// OPMAAK VAN DE FACTUUR-PDF (de "view")
// Bouwt een PDFDocument op uit één factuur-record en
// geeft het document terug. De aanroeper (de route)
// zorgt voor het versturen via res.
// =====================================================

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

const formatAmount = (value) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));

function buildInvoicePdf(invoice) {
  const fullName = [invoice.first_names, invoice.infix, invoice.last_name]
    .filter(Boolean)
    .join(" ");

  const doc = new PDFDocument({ size: "A4", margin: 50 });

  doc.fontSize(20).text("Factuur", { align: "right" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Factuurnummer: ${invoice.invoice_number}`);
  doc.text(`Factuurdatum: ${formatDate(invoice.issued_at)}`);
  doc.text(`Vervaldatum: ${formatDate(invoice.due_date)}`);
  doc.text(`Status: ${invoice.status}`);
  doc.moveDown();

  doc.text(`Rechthebbende: ${fullName || "-"}`);
  if (invoice.grave_number) doc.text(`Graf: ${invoice.grave_number}`);
  if (invoice.contract_number)
    doc.text(`Contractnummer: ${invoice.contract_number}`);
  doc.moveDown(2);

  doc.fontSize(14).text(`Totaalbedrag: ${formatAmount(invoice.amount)}`, {
    align: "right",
  });

  if (invoice.status === "betaald" && invoice.paid_at) {
    doc
      .moveDown()
      .fontSize(12)
      .text(`Betaald op: ${formatDate(invoice.paid_at)}`, {
        align: "right",
      });
  }

  doc.end();

  return doc;
}

module.exports = { buildInvoicePdf };
