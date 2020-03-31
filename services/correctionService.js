import request from "../request/request.js";
var caseInterfaces = {
  caseList: "/case/lists",
  details: "/case/details",
  correctionAsk: "/qaInterlocution/findPage",
  saveQuestion: "/qaInterlocution/saveQuestion",
  saveAnswer: "/qaInterlocution/saveAnswer",
  specialList: "/special/lists",
  special_detail: "/special/details",
  correction_detail: "/qaInterlocution/detail",
};
module.exports={
  //矫正案例
  caseList: function (data) {
    var url = caseInterfaces.caseList;
    return request.post(url,data);
  },
  //矫正案例详情
  details: function (data) {
    var url = caseInterfaces.details;
    return request.post(url,data);
  },
  //矫正问答
  correctionAsk: function (data) {
    var url = caseInterfaces.correctionAsk;
    return request.post(url,data);
  },
  //保存矫正问答文章
  saveQuestion: function (data) {
    var url = caseInterfaces.saveQuestion;
    return request.post(url,data);
  },
  //保存矫正问答评论/回复
  saveAnswer: function (data) {
    var url = caseInterfaces.saveAnswer;
    return request.post(url,data);
  },
  //矫正锦囊列表
  specialList: function (data) {
    var url = caseInterfaces.specialList;
    return request.post(url, data);
  },
  //矫正锦囊详情
  special_detail: function (data) {
    var url = caseInterfaces.special_detail;
    return request.post(url, data);
  },
  //矫正锦囊详情
  correction_detail: function (data) {
    var url = caseInterfaces.correction_detail;
    return request.post(url, data);
  },
};
