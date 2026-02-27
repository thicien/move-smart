const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:' + chrome.port
  });
  const page = await browser.newPage();
  
  let logs = '';
  page.on('console', msg => logs += 'CONSOLE: ' + msg.text() + '\n');
  page.on('pageerror', err => logs += 'REACT UNHANDLED: ' + err.message + '\n');
  
  try {
    await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle0' });
    
    // Wait for the inputs
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'pup@pup.com');
    await page.type('input[type="password"]', 'password123');
    
    // Click login
    await page.click('button[type="submit"]');
    
    // Wait for navigation or a bit
    await new Promise(r => setTimeout(r, 4000));
    
  } catch (err) {
    logs += 'TEST ERROR: ' + err.message + '\n';
  }
  
  const content = await page.content();
  fs.writeFileSync('puppeteer_full_logs.txt', logs);
  fs.writeFileSync('puppeteer_final_dom.txt', content);

  await browser.close();
  await chrome.kill();
})();
