var express = require("express");
var app = express();
var chalk = require("chalk");
var bodyParser = require("body-parser");
//配置
var config=require("./config.js");
//接口配置
var interfaces = require("./interfaces.js");

function generateResponse(data){
  let response={
    msg:"success",
    code:0,
    total:15,
    "page": {
      "pageIndex": 1,
      "pageSize": 8,
      "pageCount": 2,
      "total": 14
    }
  };
  if(data){
    response.data=data;
  }
  return JSON.stringify(response);
}


// 创建 application/json 解析
var jsonParser = bodyParser.json();

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

interfaces.map(item=>{
  if(!item.method||!item.url){
    console.log(chalk.red("method,url为必传参数！"));
    return ;
  }
  //判断是post还是get请求
  let method=item.method.toLowerCase();
  let url=item.url;
  let mockdata=null;
  if(method=="post"){
    app.post(url,urlencodedParser,function (req, res) {
      if(item.handleEvent){
        mockdata=item.handleEvent.call(this,req.body,req.query);
      }else if(item.mockdata){
        mockdata=item.mockdata;
      }
      let response = mockdata.data;
      if(!mockdata._isJsonp){
        response=generateResponse(mockdata);
      }
      res.send(response);
    });
  }

  if(method=="get"){
    app.get(url, function (req, res) {
      if(item.handleEvent){
        mockdata=item.handleEvent.call(this,null,req.query);
      }else if(item.mockdata){
        mockdata=item.mockdata;
      }
      let response = mockdata.data;
      if(!mockdata._isJsonp){
        response=generateResponse(mockdata);
      }
      res.send(response);
    });
  }
});

//默认页面输出关键词
app.get("/", function (req, res) {
  let response=generateResponse();
  res.send(response);
});
//未匹配到要渲染的页面 则直接重定向到首页
app.get("*", function (req, res) {
  res.redirect("/");
});

//监听端口 并指示用户当前的监听的地址和端口
var server = app.listen(config.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
});

server.on("listening", function () { // 执行这块代码说明端口未被占用
  var tip="模拟服务器已启动，访问地址为 http://localhost:"+config.PORT;
  console.log(chalk.green(tip));
});

server.on("error", function (err) {
  if (err.code === "EADDRINUSE") { // 端口已经被使用
    var tip="端口"+config.PORT+"已经被占用，请更换端口重试";
    console.log(chalk.red(tip));
  }
});

