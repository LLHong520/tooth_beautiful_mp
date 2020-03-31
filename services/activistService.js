import request from "../request/request.js";
var activistInterfaces = {
  activists: "/activities/lists",
};
module.exports={
  //所有活动
  activists:function(data){
    var url = activistInterfaces.activists;
    return request.post(url,data);
  }
};
