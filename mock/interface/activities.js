var tools = require("../tools.js");
module.exports=[
  {
    url: "/activities/lists",
    method:"post",
    mockdata: (
      function () {
        var item = {
          "id": 0,
          "actName": "活动名字",
          "actType": "PSP",
          "picUrl": "https://pic.wenwo.com/fimg/3272993.jpg",
          "state": "W",
          "specialId": "1",
          "addressUrl": "https://www.baidu.com",
          "pushTime": new Date().getTime(),
          "createTime": new Date().getTime()
        };
        var items = [];
        for (var i = 0; i < 5; i++) {
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url: "/article/details",
    method:"post",
    handleEvent:function(post,query){
      if(!post.id) return "缺少ID";
      let item={
        "id": 12,
        "title": "文章标题",
        "authorName": "文章标题",
        "picUrl": tools.getAvater(),
        "state": "W",
        "specialId": "1",
        "specialName": "所属专题名称",
        "content": "<div>所属专题名称</div>",
        "pushTime": new Date().getTime(),
        "createTime": new Date().getTime()
      };
      return item;
    }
  }

];
