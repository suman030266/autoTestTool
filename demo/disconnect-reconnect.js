const puppeteer = require('puppeteer');
//实现断开连接之后重新连接浏览器实例

puppeteer.launch().then(async browser => {
  // 保存 Endpoint，这样就可以重新连接  Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // 从Chromium 断开连接
  browser.disconnect();

  // 使用endpoint 重新和 Chromiunm 建立连接
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // Close Chromium
  await browser2.close();
});
