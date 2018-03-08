const puppeteer = require('puppeteer');

// 存储某个页面为图片格式

(async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });
  await page.goto('http://news.baidu.com/?tn=news');
  await page.screenshot({path: 'news.png', fullPage: true});
})();
