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
  const page = await browser.newPage();
  page.once('load', () => {
    console.log('load');
  });
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('.form-control');
  const info = await page.$('.form-control');
  let arr = ['ccc', 'ddd', 'eee'];
  await info.focus();

  await info.type('ccc', {delay: 10});
  await info.press('Enter');
  await info.type('ddd', {delay: 10});
  await info.press('Enter');
  await info.type('eee', {delay: 10});
  await info.press('Enter');
  //list-group-item

  // 获取一组元素 等待加载完后获取 循环加事件   checkout
  await page.waitForSelector('.list-group-item');
  const inputs = await page.$$('.list-group-item [type="checkbox"]', input => input);
  inputs.forEach(async item =>{
    await item.click();
  });
  // 获取button 删除当前一条
  const btns = await page.$$('.list-group-item button', btn => btn);
  btns.forEach(async item =>{
    await item.click({delay: 100});
  });

  // 获取一组元素的属性(w3c认识的)
  let links = await page.$$eval('.list-group-item', links => links.map(a => ({class: a.className})));
  console.log(links);

  //
  await page.evaluate(async () => {
    console.log(111);
    // let aLi = document.getElementsByClassName('.list-group-item');
    // aLi = Array.prototype.slice.call(aLi, 0);
    // console.log(aLi);
    let arr = [];
    // [].slice.call(aLi).forEach(item =>{
    //   cosnole.log(234432)
    //   arr.push(arr.dataset.id);
    // });
  });

  // 循环加元素 不行
  // await arr.forEach(async item =>{
  //   console.log(item);
  //   await info.type(item);
  //   await info.press('Enter');
  // });
});


/**/
