var Promise = require("../plugins/es6-promise.js");
import configs from "../config.js";
import myToast from "../components/showToast/showToast";

//promise写法
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (response) {
        var app = getApp();
        if (response.data.code==401){
          app.globalData.unionId = null;
          app.globalData.userInfo=null;
          app.globalData.islogin=false;
          wx.removeStorageSync("unionId");
          wx.removeStorageSync("userInfo");
          wx.navigateTo({
            url:"/pages/login/login"
          });
        }else{
          if (response.data.msg&&response.data.msg.toLowerCase()!="success"){
            myToast.show({title:response.data.msg});
          }
          //===================针对不是401的code 这里进行处理
          switch(parseInt(response.data.code)){
          // case 5000://对象不存在
          case 5003://对象不存在
          case 5901://帖子已删除
          case 5900://帖子不存在
          case 5007://目标用户（被查看的用户）被锁定
            wx.redirectTo({
              url:"/pages/404/404"
            });
            return;
            break;
          case 5002://当前登录用户无权限访问
          case 5006://当前登录用户被锁定
            app.globalData.unionId = null;
            app.globalData.userInfo=null;
            app.globalData.islogin=false;
            wx.switchTab({
              url:"/index/index"
            });
            return;
            break;
          }
        }
        //成功
        resolve(response.data);
      };
      obj.fail = function (res) {
        //失败
        reject(res);
      };
      fn(obj);
    });
  };
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason; })
  );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function get(url, data) {
  url=configs.API_URL+url;
  var getRequest = wxPromisify(wx.request);
  return getRequest({
    url: url,
    method: "GET",
    data: data,
    header: {
      "Content-Type": "application/json"
    }
  });
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function post(url, data) {
  var app = getApp();
  url=configs.API_URL+url;
  var postRequest = wxPromisify(wx.request);
  return postRequest({
    url: url,
    method: "POST",
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  });
}
/**
 * 微信请求postFile方法封装
 * url
 * data 以对象的格式传入
 */
function postFile(url,data) {
  url=configs.API_URL+url;
  var postRequest = wxPromisify(wx.uploadFile);
  return postRequest({
    url: url,
    filePath:data.filePath,
    name:"fileData",
    formData: data,
    header: {
      "content-type": "multipart/form-data"
    }
  });
}

module.exports = {
  post: post,
  postFile: postFile,
  get: get
};