import configs from "../config.js";
var Promise = require("../plugins/es6-promise.js");
var m_default="../../assets/default/m_default@3x.png";
var user_avater="../../assets/default/user-avater.png";

var utils={};

utils.formatTime=function(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
};
utils.getMatchUrl=function(originUrl){
  //正则
  var tRegs=/\/t\/\w/;
  var mRegs=/^\/m\/\w/;
  var u_integralRegs=/\/u_integral/;
  var forumMRegs=/^\/forum\/m\/\w/;
  var uFansRegs=/\/u\/[a-zA-Z0-9]{10,}\/fans/;
  var forumRegs=/\/home/;
  var questionReg=/\/my\/ask_detail\/\w/;
  var cw_activetyReg=/\/cw\/act\/\w/;
  //目标跳转方式
  var targetUrl="";
  var targetUrlType="page";
  //链接匹配
  var baseUrl=originUrl.split("?")[0];
  if(originUrl!=null&&originUrl!=""){
    if(mRegs.test(baseUrl)){
      targetUrl="/pages/moment/moment?id="+baseUrl.split("/")[2];
    }
    if(forumMRegs.test(baseUrl)){
      targetUrl="/pages/moment/moment?id="+baseUrl.split("/")[3];
    }
    if(u_integralRegs.test(baseUrl)){
      targetUrl="/pages/integral/integral";
    }
    if(tRegs.test(baseUrl)){
      targetUrl="/pages/topic/topic?id="+baseUrl.split("/")[2];
    }
    if(uFansRegs.test(baseUrl)){
      targetUrl="/pages/user_fans/user_fans?id="+baseUrl.split("/")[2];
    }
    if(forumRegs.test(baseUrl)){
      targetUrl="/pages/index/index";
      targetUrlType="tab";
    }
    if(questionReg.test(baseUrl)){
      targetUrl="/pages/question/question?id="+baseUrl.split("/")[3];
    }
    if(cw_activetyReg.test(baseUrl)){
      var splitArr=baseUrl.split("/");
      var aid=splitArr[splitArr.length-1];
      targetUrl="/pages/cw_activety/cw_activety?aid="+aid;
    }
  }
  if(originUrl.indexOf("?")>=0){
    targetUrl=targetUrl+"&"+originUrl.split("?")[1];
  }
  return {
    targetUrl,
    targetUrlType
  };
};
utils.GET_IMG_URL=function(picID,type) {
  let url=picID;
  if(picID==""||picID==null||picID==undefined){
    if(type=="m"){
      url=m_default;
    }else if(type=="u"){
      url=user_avater;
    }
  }else{
    if(/http/.test(picID)){
      //网络图片
    }else{
      //图片服务器图片
      url=configs.PIC_URL+picID+configs.SUB_FIX;
    }
  }
  return url;
};

utils.formatNumber=function(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

utils.trim=function(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
utils.isEmpty=function(str){
  var str=this.trim(str);
  if(str==""){
    return true;
  }else{
    return false;
  }
};
utils.isNumber=function(str){
  var str=this.trim(str);
  var exp=/^[0-9]*[1-9][0-9]*$/;
  if(exp.test(str)){
    return true;
  }else{
    return false;
  }
};
utils.isMobile=function(mobile){
  var mobile=this.trim(mobile);
  var exp=/^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
  if(exp.test(mobile)){
    return true;
  }else{
    return false;
  }
};
utils.getFormatFakeHtml=function(strContent){
  strContent = strContent.replace(/\r\n/g, "[br]"); //IE9、FF、chrome
  strContent = strContent.replace(/\n/g, "[br]"); //IE7-8
  strContent = strContent.replace(/\s/g, " "); //空格处理
  return strContent;
　　};
utils.getFormatHtml=function(strContent){
  strContent = strContent.replace(/\[br\]/g, "<br/>"); //IE9、FF、chrome
  return strContent;
};
utils.getFormatStr=function(strContent){
  strContent = strContent.replace(/\[br\]/g, "\r\n");
  strContent = strContent.replace(/\[br\]/g, "\r\n");
  strContent = strContent.replace(/\<br\/\>\]/g, "\n");
  strContent = strContent.replace(/\&nbsp;\]/g, " ");
  return strContent;
};
utils.replaceHtmlTag=function(strContent){
  strContent = strContent.replace(/\[br\]/g, "");
  return strContent;
};
utils.rand=function(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
};
utils.delHtmlTag=function(str){
  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
};
//promise写法
utils.wxPromisify=function(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res.data);
      };
      obj.fail = function (res) {
        //失败
        reject(res);
      };
      fn(obj);
    });
  };
};

module.exports=utils;
