const Invoice = require('../models/Invoice');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs').promises;

// SVG content for the logo
const LOGO_SVG = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">
<path fill="#000000" opacity="1.000000" stroke="none" d="M286.000000,501.000000 C190.666687,501.000000 95.833382,501.000000 1.000051,501.000000 C1.000034,334.333405 1.000034,167.666794 1.000017,1.000140 C167.666565,1.000094 334.333130,1.000094 500.999756,1.000047 C500.999847,167.666519 500.999847,334.333038 500.999939,500.999786 C429.500000,501.000000 358.000000,501.000000 286.000000,501.000000 M376.045807,74.426849 C369.493652,70.487366 363.001434,66.443871 356.379028,62.626259 C326.484558,45.392948 294.136353,36.429012 259.781097,35.110577 C217.824448,33.500431 178.674576,43.294411 142.155594,64.372292 C118.711021,77.903938 98.852943,95.388245 81.909073,116.142654 C64.125923,137.925095 51.529518,162.796646 43.737144,189.734482 C32.193985,229.638641 31.653927,269.753937 43.180820,310.001709 C51.766575,339.980164 65.959602,366.862396 86.075256,390.451813 C101.134949,408.112152 118.327507,423.477081 138.486694,435.507812 C157.108627,446.621185 176.685043,455.176697 197.614822,460.524261 C221.036835,466.508545 244.809830,468.212799 268.983612,466.174194 C304.933960,463.142517 337.975403,451.989685 368.207764,432.427246 C385.790466,421.050049 401.849426,407.701233 415.155334,391.576660 C428.293304,375.655579 439.970184,358.617188 448.270477,339.474854 C459.602081,313.341583 466.238556,286.166992 466.928650,257.664734 C467.541840,232.336929 464.226990,207.639343 456.313934,183.379135 C449.934631,163.821259 440.773834,145.807388 429.450439,128.916916 C415.233795,107.710739 396.919861,90.251122 376.045807,74.426849 z"/>
<path fill="#04111B" opacity="1.000000" stroke="none" d="M376.342712,74.630920 C396.919861,90.251122 415.233795,107.710739 429.450439,128.916916 C440.773834,145.807388 449.934631,163.821259 456.313934,183.379135 C464.226990,207.639343 467.541840,232.336929 466.928650,257.664734 C466.238556,286.166992 459.602081,313.341583 448.270477,339.474854 C439.970184,358.617188 428.293304,375.655579 415.155334,391.576660 C401.849426,407.701233 385.790466,421.050049 368.207764,432.427246 C337.975403,451.989685 304.933960,463.142517 268.983612,466.174194 C244.809830,468.212799 221.036835,466.508545 197.614822,460.524261 C176.685043,455.176697 157.108627,446.621185 138.486694,435.507812 C118.327507,423.477081 101.134949,408.112152 86.075256,390.451813 C65.959602,366.862396 51.766575,339.980164 43.180820,310.001709 C31.653927,269.753937 32.193985,229.638641 43.737144,189.734482 C51.529518,162.796646 64.125923,137.925095 81.909073,116.142654 C98.852943,95.388245 118.711021,77.903938 142.155594,64.372292 C178.674576,43.294411 217.824448,33.500431 259.781097,35.110577 C294.136353,36.429012 326.484558,45.392948 356.379028,62.626259 C363.001434,66.443871 369.493652,70.487366 376.342712,74.630920"/>
</svg>`;

// Function to get logo URL
const getLogoUrl = () => {
  // Use the deployed URL in production, local URL in development
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.lynkdigital.co.in'
    : 'http://localhost:3000';
  return `${baseUrl}/lynkdigital.svg`;
};

exports.addInvoice = async (req, res) => {
  try {
    const { clientName, phone, email, companyName, advanceAmount, remainingBalance, fullAmount, lineItems, note, bankName, accountNumber, paymentType } = req.body;
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
      bankName,
      accountNumber,
      paymentType,
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

    // HTML template for the invoice with new UI design
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 0; 
          background: #fff; 
          font-size: 14px;
        }
        .container { 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          background: #fff; 
        }
        
        /* Header Section */
        .header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 0 0 20px 0; 
          border-bottom: 3px solid #4A90E2;
          margin-bottom: 30px;
        }
        .logo-section { 
          display: flex; 
          align-items: center; 
        }
        .company-name { 
          font-size: 18px; 
          font-weight: bold; 
          color: #333; 
        }
        .invoice-title { 
          font-size: 32px; 
          color: #4A90E2; 
          font-weight: bold; 
          letter-spacing: 3px;
        }
        
        /* Invoice Details */
        .invoice-details { 
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 30px; 
        }
        .invoice-to {
          flex: 1;
        }
        .invoice-to h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          font-weight: normal;
          color: #666;
        }
        .client-name {
          font-weight: bold;
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
        .invoice-meta {
          text-align: right;
        }
        .invoice-meta div {
          margin-bottom: 5px;
          color: #666;
        }
        .invoice-meta strong {
          color: #333;
        }
        
        /* Table */
        .table-container {
          margin-bottom: 30px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          background: #fff;
        }
        th {
          background: #4A90E2;
          color: white;
          padding: 12px 8px;
          text-align: center;
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.5px;
          border: 1px solid #4A90E2;
        }
        td {
          padding: 10px 8px;
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
          font-size: 13px;
          border-left: 1px solid #e0e0e0;
          border-right: 1px solid #e0e0e0;
        }
        tbody tr:nth-child(even) {
          background: #E8F4FD;
          border-left: 1px solid #4A90E2;
          border-right: 1px solid #4A90E2;
        }
        tbody tr:nth-child(odd) {
          background: #fff;
          border-left: none;
          border-right: none;
        }
        tbody tr:first-child td {
          border-top: 1px solid #4A90E2;
        }
        tbody tr:last-child td {
          border-bottom: 1px solid #4A90E2;
        }
        
        /* Bottom Section */
        .bottom-section {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 40px;
        }
        .payment-method {
          flex: 0.8;
          max-width: 300px;
        }
        .grand-total {
          flex: 0.8;
          max-width: 300px;
        }
        .section-header {
          background: #4A90E2;
          color: white;
          padding: 12px 15px;
          font-weight: bold;
          font-size: 12px;
          letter-spacing: 0.5px;
          margin-bottom: 0;
        }
        .section-content {
          padding: 15px;
          min-height: 60px;
        }
        .grand-total-amount {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-top: 10px;
        }
        
        /* Thank you and signature */
        .footer-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-bottom: 40px;
          margin-top: 40px;
        }
        .thank-you {
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }
        .signature-name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .signature-title {
          font-weight: bold;
          color: #666;
          font-size: 12px;
        }
        
        /* Contact footer */
        .contact-footer {
          border-top: 3px solid #4A90E2;
          padding-top: 20px;
          display: flex;
          justify-content: center;
          gap: 60px;
          color: #4A90E2;
          font-size: 13px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .contact-icon {
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="logo-section">
            ${LOGO_SVG}
            <div class="company-name">LYNK DIGITAL</div>
          </div>
          <div class="invoice-title">INVOICE</div>
        </div>
        
        <!-- Invoice Details -->
        <div class="invoice-details">
          <div class="invoice-to">
            <h3>Invoice to:</h3>
            <div class="client-name">${invoice.clientName}</div>
            ${invoice.phone ? `<div>Contact: ${invoice.phone}</div>` : ''}
            ${invoice.email ? `<div>${invoice.email}</div>` : ''}
          </div>
          <div class="invoice-meta">
            <div><strong>Invoice no:</strong> ${invoice._id}</div>
            <div><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        
        <!-- Table -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.lineItems && invoice.lineItems.length > 0
                ? invoice.lineItems.map((item, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${item.description || ''}</td>
                    <td>${item.qty || 1}</td>
                    <td>₹${item.price || item.amount || 0}</td>
                    <td>₹${(item.qty ? item.qty * (item.price || item.amount || 0) : (item.price || item.amount || 0))}</td>
                  </tr>
                `).join('')
                : `<tr><td colspan="5">No line items</td></tr>`}
            </tbody>
          </table>
        </div>
        
        <!-- Bottom Section -->
        <div class="bottom-section">
          <div class="payment-method">
            <div class="section-header">PAYMENT METHOD:</div>
            <div class="section-content">
              ${invoice.paymentType === 'bank_transfer' ? `
                <div>Bank Name: ${invoice.bankName || 'Not provided'}</div>
                <div>Account Number: ${invoice.accountNumber || 'Not provided'}</div>
              ` : `
                <div>Payment Type: ${invoice.paymentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
              `}
            </div>
          </div>
          <div class="grand-total">
            <div class="section-header">GRAND TOTAL:</div>
            <div class="section-content">
              <div class="grand-total-amount">₹${invoice.fullAmount || 0}</div>
            </div>
          </div>
        </div>
        
        <!-- Footer Section -->
        <div class="footer-section">
          <div class="thank-you">Thank you for business with us!</div>
          <div class="signature-name">Swarada Mhetre</div>
          <div class="signature-title">CFO</div>
        </div>
        
        <!-- Contact Footer -->
        <div class="contact-footer">
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <span>8010195467</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">✉</span>
            <span>hello@lynkdigital.co.in</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span>Chintamani Apartments,<br>Sadashiv Peth, Pune</span>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
      headless: "new", 
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    });

    console.log('Creating new page...');
    const page = await browser.newPage();
    
    console.log('Setting content...');
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    console.log('Closing browser...');
    await browser.close();

    console.log('Sending response...');
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoice._id}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: 'PDF generation error', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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