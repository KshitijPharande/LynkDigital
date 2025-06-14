const puppeteer = require('puppeteer');
const path = require('path');

async function testPuppeteer() {
  console.log('Starting Puppeteer test on Windows...');
  console.log('Node version:', process.version);
  console.log('Platform:', process.platform);
  console.log('Architecture:', process.arch);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Current directory:', process.cwd());
  
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
    });
    console.log('Browser launched successfully');

    const page = await browser.newPage();
    console.log('New page created');

    await page.setContent('<h1>Test Page</h1>');
    console.log('Content set successfully');

    const pdf = await page.pdf({ format: 'A4' });
    console.log('PDF generated successfully, size:', pdf.length);

    // Save the test PDF
    const fs = require('fs');
    const testPdfPath = path.join(process.cwd(), 'test-output.pdf');
    fs.writeFileSync(testPdfPath, pdf);
    console.log('Test PDF saved to:', testPdfPath);

    await browser.close();
    console.log('Browser closed successfully');
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    process.exit(1);
  }
}

testPuppeteer(); 