let puppeteer = require('puppeteer');


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
  let json = {
    LOG: []
  };
  // 试试load domcontentloaded pageerror(try catch)
  /*document.addEventListener("DOMContentLoaded", function(event) {
      console.log("DOM fully loaded and parsed");
  });*/
  // 关于请求响应 request requestfailed requestfinished response
  // 获取元素1个元素 一组元素 获取请求后插入的元素  page.$(selector) page.$$(selector)
  // page.$$eval(selector, pageFunction[, ...args])

  // 在页面中添加 script style page.addScriptTag(options) page.addStyleTag(options)

  // 往前切换选项卡 page.bringToFront()
  // 拿到页面 所有文档 page.content()
  // cookie 操作 page.cookies()  page.deleteCookie()  page.setCookie()

  // 模拟手机效果 page.emulate(options) page.emulateMedia(mediaType)更改页面的CSS media

  // page.evaluate(pageFunction, ...args)  page.evaluateHandle(pageFunction, ...args) page.evaluateOnNewDocument(pageFunction, ...args)
  // page.exposeFunction(name, puppeteerFunction)

  // page.focus(selector) 得到焦点    page.title()  page.keyboard  page.mouse  page.tap(selector)  page.select  page.setContent(html)
  // page.goForward(options)  page.goBack(options)  page.hover(selector)
  // page.reload(options)
  // page.setDefaultNavigationTimeout(timeout)  page.setExtraHTTPHeaders(headers)  page.setJavaScriptEnabled(enabled)  page.setOfflineMode(enabled)  page.setRequestInterception(value)

  // page.touchscreen

  // page.waitFor(selectorOrFunctionOrTimeout[, options[, …args]]) 下面三个的综合 API
  // page.waitForFunction(pageFunction[, options[, …args]]) 等待 pageFunction 执行完成之后
  // page.waitForNavigation(options) 等待页面基本元素加载完之后，比如同步的 HTML, CSS, JS 等代码
  // page.waitForSelector(selector[, options]) 等待某个选择器的元素加载之后，这个元素可以是异步加载的，这个 API 非常有用，你懂的。

  // Class ElementHandle

  // Coverage收集关于页面使用的JavaScript和CSS部分的信息。使用JavaScript和CSS覆盖获取初始执行代码的百分比的示例：page.coverage() 在最后有用



  const page = await browser.newPage();
  page.on('console', msg => json.LOG.push('PAGE LOG:', msg.text()));
  page.once('load', () => console.log('load'));
  page.on('domcontentloaded', ()=> console.log('domcontentloaded'))
  await page.tracing.start({path: 'trace.json'});
  await page.goto('http://localhost:3000/');
  page.on('request', request => {
    json[request.url()] = {};
    json[request.url()].requestHeader = request.headers();
    json[request.url()].requestMethod = request.method();
    json[request.url()].resourceType = request.resourceType();
    // console.log('json', json);
  });
  json.metricsObj = await page.metrics();
  page.on('error', msg => console.log('页面崩溃了'));



  await page.tracing.stop();

  // await browser.close();
});


/**/
