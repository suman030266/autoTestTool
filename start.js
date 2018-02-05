#!/usr/bin/env node
const express = require('express'),
      path = require('path')
      app = express(),
      exec = require('child_process').exec;
let port = 8080,
    data;

app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html', require('ejs').__express);

app.get('/', function (req, res){
  res.redirect('/setPage');
});

// 渲染结果页
app.get('/result', function (req, res){
  res.render('demo', {data});
});

// 设置参数页
app.get('/setPage', function (req, res){
  res.render('setPage', {});
});

// 接口
app.get('/getUrl', function (req, res){
  let url = req.query.url;
  console.log(`will visit this page ${url}`);
  // http://meidian.gome.com.cn/
  // https://www.cnblogs.com/jihequn/p/6026455.html
  let dataUrl = `./jsons/report-${Math.random()}.json`;
  let cmd = `lighthouse ${url} --output=json --output-path=${dataUrl} --save-assets --disable-device-emulation`;
  exec(cmd, (error, stdout, stderr)=>{
    if(error){
      console.log('error' + error);
      res.send({error});
    }
    console.log(`${stdout} tasks is over, will render`);
    data = require(dataUrl);
    res.redirect('/result');
  });
});

app.use(express.static(path.resolve('static')));

app.all('*', function (req, res){
     res.send('404');
});

app.listen(port, ()=>{
  console.log(`server is running at ${port}`)
});
