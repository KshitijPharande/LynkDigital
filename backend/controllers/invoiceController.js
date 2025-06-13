const Invoice = require('../models/Invoice');
const puppeteer = require('puppeteer');
const path = require('path');

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
    console.log('Starting PDF generation process for invoice ID:', req.params.id);
    
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      console.log('Invoice not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Invoice not found' });
    }
    console.log('Invoice found:', { 
      id: invoice._id,
      clientName: invoice.clientName,
      totalAmount: invoice.fullAmount 
    });

    // HTML template for the invoice with new UI design
    console.log('Generating HTML template...');
    const html = `
    <!DOCTYPE html>
     <html>
<head>
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
            <img src="https://backendd.lynkdigital.co.in/lynk-logo.webp" alt="Lynk Digital Logo" style="width: 60px; height: 60px; margin-right: 15px;" />
            <div class="company-name">LYNK DIGITAL</div>
      </div>
      <div class="invoice-title">INVOICE</div>
    </div>
        
        <!-- Invoice Details -->
        <div class="invoice-details">
          <div class="invoice-to">
            <h3>Invoice to :</h3>
            <div class="client-name">${invoice.companyName ? invoice.companyName : ''}</div>
            <div>${invoice.clientName}</div>
        ${invoice.phone ? 'Contact: ' + invoice.phone + '<br/>' : ''}
        ${invoice.email ? invoice.email + '<br/>' : ''}
      </div>
          <div class="invoice-meta">
        <div><strong>Invoice no :</strong> ${invoice._id}</div>
        <div><strong>Date-</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</div>
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
            <div class="section-header">PAYMENT METHOD :</div>
            <div class="section-content">
              ${invoice.paymentType === 'bank_transfer' ? `
                <div>Bank Name : ${invoice.bankName || 'Not provided'}</div>
                <div>Account Number : ${invoice.accountNumber || 'Not provided'}</div>
              ` : `
                <div>Payment Type : ${invoice.paymentType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
              `}
            </div>
          </div>
          <div class="grand-total">
            <div class="section-header">GRAND TOTAL :</div>
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
    console.log('HTML template generated successfully');

    console.log('Launching Puppeteer browser...');
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: "new",
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920x1080'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
      });
    } catch (err) {
      console.error('Failed to launch Puppeteer:', err);
      throw new Error(`Failed to launch browser: ${err.message}`);
    }
    console.log('Browser launched successfully');

    let page;
    try {
      console.log('Creating new page...');
      page = await browser.newPage();
      console.log('New page created');

      console.log('Setting page content...');
      await page.setContent(html, { waitUntil: 'networkidle0' });
      console.log('Page content set successfully');

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
      console.log('PDF generated successfully, buffer size:', pdfBuffer.length);

      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed successfully');

      console.log('Setting response headers...');
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice-${invoice._id}.pdf`,
      });
      console.log('Response headers set');

      console.log('Sending PDF response...');
      res.send(pdfBuffer);
      console.log('PDF response sent successfully');
    } catch (err) {
      console.error('Error during PDF generation:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      
      // Make sure to close the browser if it was opened
      if (browser) {
        try {
          await browser.close();
          console.log('Browser closed after error');
        } catch (closeErr) {
          console.error('Error closing browser after error:', closeErr);
        }
      }
      
      throw err;
    }
  } catch (err) {
    console.error('PDF generation error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
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