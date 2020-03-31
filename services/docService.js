import request from "../request/request.js";
let docInterfaces={
  docs: "/doctor/findPage",
  doc_consult: "/consult/addConsult",
};
export default {
  //医生列表
  docs: function (data) {
    let url = docInterfaces.docs;
    return request.post(url,data);
  },
  //咨询医生
  doc_consult: function (data) {
    let url = docInterfaces.doc_consult;
    return request.post(url,data);
  },
};
