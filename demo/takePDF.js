const puppeteer = require('puppeteer');

// 打开一个页面 保存为PDF格式
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://es6.ruanyifeng.com/#docs/intro', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();
