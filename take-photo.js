const puppeteer = require('puppeteer');

(async () => {
  // create broswer
  const browser = await puppeteer.launch({headless: false});
  // create new page
  const page = await browser.newPage();
  // set page url
  await page.goto('https://github.com/');
  // set picture size   default 800*600
  page.setViewport({width: 1200, height: 800});
  // take phone to example.pn
  await page.screenshot({path: 'github.png'});
  // close this browser
  await browser.close();
})();
