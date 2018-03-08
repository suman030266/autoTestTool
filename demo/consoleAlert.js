// 获取浏览器alert console信息 以及设置

const puppeteer = require('puppeteer');
let options = {
    headless: false,  // 是否开启无头模式  默认ture 不展示UI
    slowMo: 0,  // 执行速度减慢 2000ms 可帮助我们看清楚页面操作
    gnoreHTTPSErrors: true,  // 在请求的过程中是否忽略https报错信息 默认false
    timeout: 0, // 等待chromium启动超时时间 默认 30s 如果传入0 不限制时间
    devtools: true, // 是否为每个选项卡自动打开devtools面板 显示ui时才有效
    handleSIGINT: true  // ctrl c结束进程时是否关闭浏览器
};
let browser = puppeteer.launch(options);
(async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');

  page.on('console', (msg) => {
    return console.log('log from page', msg.text());
  });
  // 监听用户alert会执行这个方法 可以获取到用户alert prompt confirm beforeunload 的内容
  page.on('dialog', async dialog => {
    console.log('dialog',dialog.message());
  });
  // 模拟用户在控制台输入
  page.evaluate(() => console.log('log from puppteer', 5));
  // 模拟用户alert
  page.evaluate(() => alert('dialog from puppteer'));
  
  // await browser.close();
})();
