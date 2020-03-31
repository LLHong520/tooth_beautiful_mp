var tools = require("../tools.js");
module.exports=[
  {
    url: "/article/lists",
    method:"post",
    mockdata: (
      function () {
        var item = {
          "id": 11,
          "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
          "authorName": "张大大",
          "picUrl": "https://pic.wenwo.com/fimg/3272993.jpg",
          "state": "W",
          "specialId": "1",
          "specialName": "所属专题名称所属专题名称所属专题名称所属专题名称",
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
    url: "/questionnaire/findPage",
    method:"post",
    mockdata: (
      function () {
        var item = {
          "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
          "img": "https://pic.wenwo.com/fimg/3272993.jpg",
          "url": "https://www.baidu.com",
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
        "title": "如何正确刷牙？我每次刷牙都小小心翼翼还是刷出血，怎么办？",
        "authorName": "张大大",
        "picUrl": tools.getAvater(),
        "state": "W",
        "specialId": "1",
        "specialName": "所属专题名称",
        "content": "<div>所属专题名称</div><img src='https://pic.wenwo.com/fimg/3272993.jpg'/>",
        "pushTime": new Date().getTime(),
        "createTime": new Date().getTime()
      };
      return item;
    }
  }

];
