import request from "../request/request.js";
var articleInterfaces = {
  artList: "/article/lists",
  detail: "/article/details",
  welfareList: "/questionnaire/findPage",
};
module.exports={
  //文章列表
  artList: function (data) {
    var url = articleInterfaces.artList;
    return request.post(url,data);
  },
  //爱牙知识文章详情
  detail: function (data) {
    var url = articleInterfaces.detail;
    return request.post(url,data);
  },
  //调查福利列表
  welfareList: function (data) {
    var url = articleInterfaces.welfareList;
    return request.post(url,data);
  },
};
