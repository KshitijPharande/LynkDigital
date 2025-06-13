const Invoice = require('../models/Invoice');
const puppeteer = require('puppeteer');
const path = require('path');

exports.addInvoice = async (req, res) => {
  try {
    const { clientName, phone, email, companyName, advanceAmount, remainingBalance, fullAmount, lineItems, note } = req.body;
    // Calculate fullAmount if not provided
    const total = lineItems && Array.isArray(lineItems)
      ? lineItems.reduce((sum, item) => sum + Number(item.amount || 0), 0)
      : Number(fullAmount) || 0;
    const invoice = new Invoice({
      clientName,
      phone,
      email,
      companyName,
      advanceAmount,
      remainingBalance,
      fullAmount: total,
      lineItems: lineItems || [],
      note,
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    // HTML template for the invoice
    const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; align-items: center; }
          .company { font-size: 1.2em; font-weight: bold; }
          .section { margin-top: 30px; }
          .section-title { font-weight: bold; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">
            <img src="http://localhost:3000/lynk-logo.webp" alt="Lynk Digital Logo" style="height:60px; margin-bottom:10px;" />
            <br/>
            ${invoice.sender.name}<br/>
            ${invoice.sender.address}<br/>
            ${invoice.sender.phone}<br/>
            ${invoice.sender.email}
          </div>
          <div>
            <h2>INVOICE</h2>
            <div>Date: ${new Date(invoice.createdAt).toLocaleDateString()}</div>
            <div>Invoice #: ${invoice._id}</div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">Bill To:</div>
          <div>${invoice.clientName}</div>
          <div>${invoice.companyName || ''}</div>
          <div>${invoice.phone}</div>
          <div>${invoice.email}</div>
        </div>
        <div class="section">
          <table>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            ${invoice.lineItems && invoice.lineItems.length > 0
              ? invoice.lineItems.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>₹${item.amount}</td>
                </tr>
              `).join('')
              : `<tr><td colspan=\"2\">No line items</td></tr>`}
            <tr>
              <th style="text-align:right;" colspan="1">Total</th>
              <th>₹${invoice.fullAmount || 0}</th>
            </tr>
            <tr>
              <td>Advance</td>
              <td>₹${invoice.advanceAmount || 0}</td>
            </tr>
            <tr>
              <td>Remaining</td>
              <td>₹${invoice.remainingBalance || 0}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoice._id}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ message: 'PDF generation error', error: err });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 