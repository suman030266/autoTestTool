const puppeteer = require('puppeteer');
function sleep(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(1)
			} catch (e) {
				reject(0)
			}
		}, delay)
	})
};

puppeteer.launch({
  headless: false,  // 是否开启无头模式  默认ture 不展示UI
  slowMo: 0,  // 执行速度减慢 2000ms 可帮助我们看清楚页面操作
  gnoreHTTPSErrors: true,  // 在请求的过程中是否忽略https报错信息 默认false
  timeout: 0, // 等待chromium启动超时时间 默认 30s 如果传入0 不限制时间
  devtools: true, // 是否为每个选项卡自动打开devtools面板 显示ui时才有效
  handleSIGINT: true
}).then(async browser => {
  	let page = await browser.newPage();
  	await page.setJavaScriptEnabled(true);
  	await page.goto("http://www.baidu.com/");
  	const searchInput = await page.$(".quickdelete-wrap");
  	await searchInput.focus(); //定位到搜索框
  	await page.keyboard.type("javascript", {delay: 100});
  	const searchBtn = await page.$("#su");
  	await searchBtn.click();
    await page.waitForSelector('.c-container');
  	const links = await page.$$eval('.c-container > .t > a', links => {
  		return links.map(a => {
  			return {
  				href: a.href.trim(),
  				target: a.target
  			}
  		});
  	});
  	// page.close();
  	const aTags = links.splice(0, 2);
  	for (var i = 0; i < aTags.length; i++) {
  		page = await browser.newPage()
  		page.setJavaScriptEnabled(true);
  		await page.setViewport({width:1920, height:1080});
  		var a = aTags[i];
  		await page.goto(a.href, {timeout:0});
      
  		let scrollEnable = true;
  		let scrollStep = 100; //每次滚动的步长
  		while (scrollEnable) {
  			scrollEnable = await page.evaluate((scrollStep) => {
  				let scrollTop = document.scrollingElement.scrollTop;
  				document.scrollingElement.scrollTop = scrollTop + scrollStep;
  				return document.body.clientHeight > scrollTop + 1080 ? true : false
  			}, scrollStep);
  			await sleep(100);
  		}
  		let filename = "images/items-"+i+".png";
  		await page.screenshot({path:filename});
  		page.close();
  	}
  	browser.close();
});
