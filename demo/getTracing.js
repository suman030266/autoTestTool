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

browser.then(async (browser) => {
  const page = await browser.newPage();
  page.once('load', () => console.log('Page loaded!'));
  await page.tracing.start({path: 'trace.json'});
  await page.goto('https://www.baidu.com');
  await page.tracing.stop();

  // "pid":12534
  // "tid":1295
  // "ts":201116662237
  // "ph":"X"
  // "cat":"toplevel"
  // "name":"MessageLoop::RunTask"
  // "args":{"src_file":"../../base/trace_event/trace_log.cc"
  // "src_func":"SetEnabled"}
  // "dur":256
  // "tdur":57
  // "tts":1064319
});
