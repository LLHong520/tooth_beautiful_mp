import request from "../request/request.js";
let sysInterfaces={
  errCodes:"/sys/qryCodeAndMsg",
  hotKeyword:"/hotword/qryWords",
  wbShare:"/weiboShare/act",
  upload: "/file/upload",
  decryptUser: "/wx/decryptUser",
  sns: "/wx/sns",
};
module.exports={
  //获取系统错误信息字典
  errCodes:function(data){
    let url=sysInterfaces.errCodes;
    return request.post(url,data);
  },
  hotKeyword:function(data){
    let url=sysInterfaces.hotKeyword;
    return request.post(url,data);
  },
  //微博分享
  wbShare:function(data){
    let url=sysInterfaces.wbShare;
    return request.post(url,data);
  },
  //发帖上传图片
  upload: function (data) {
    let url = sysInterfaces.upload;
    return request.postFile(url, data);
  },
  //解密
  decryptUser: function (data) {
    let url = sysInterfaces.decryptUser;
    return request.get(url, data);
  },
  //解密
  sns: function (data) {
    let url = sysInterfaces.sns;
    return request.get(url, data);
  },
};
