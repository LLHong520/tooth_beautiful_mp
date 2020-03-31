var tools = require("../tools.js");
module.exports=[
  {
    url: "/case/lists",
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
    url: "/qaInterlocution/findPage",
    method:"post",
    mockdata: (
      function () {
        var item = {
          "id": 11,
          "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
          "authorName": "张大大",
          "img": "https://pic.wenwo.com/fimg/3272993.jpg",
          "dialogNum": tools.rand(0, 6),
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
    url: "/case/details",
    method: "post",
    handleEvent: function (post, query) {
      if (!post.id) return "缺少ID";
      let item = {
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
  },
  {
    url: "/qaInterlocution/detail",
    method: "post",
    handleEvent: function (post, query) {
      if (!post.id) return "缺少ID";
      let item = {
        "id": 12,
        "title": "文章标题",
        "unionId": 0,
        "nickName": "文扣扣",
        "headimgurl": "https://pic.wenwo.com/fimg/3272993.jpg",
        "content": "<div>提问内容所属专题名称<img src='https://pic.wenwo.com/fimg/3272993.jpg'></div>",
        "createTime": new Date().getTime(),
      };
      let List = [];
      for (let index = 1; index <= 5; index++) {
        let item = {
          "unionId": 0,
          "nickName": "文扣扣",
          "headimgurl": "https://pic.wenwo.com/fimg/3272993.jpg",
          "content": "提问内容所属专题名称",
          "answerTime": new Date().getTime(),
          "answer":{
            "nickName": "文扣扣",
            "content": "回复提问内容所属专题名称",
          }
        };
        List.push(item);
      }
      item.answers = List;
      return item;
    }
  },
  {
    url: "/special/lists",
    method: "post",
    mockdata: (
      function () {
        var item = {
          "id": 0,
          "picUrl": tools.getAvater(),
          "state": "W",
          "specialId": "1",
          "specialName": "所属专题名称",
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
    url: "/special/details",
    method: "post",
    handleEvent: function (post, query) {
      if (!post.id) return "缺少ID";
      let item = {
        "id": 12,
        "title": "文章标题",
        "authorName": "文章标题",
        "picUrl": "https://pic.wenwo.com/fimg/3272993.jpg",
        "state": "W",
        "specialId": "1",
        "specialName": "所属专题名称",
        "contents": "<div>所属专题名称</div>",
        "pushTime": new Date().getTime(),
        "createTime": new Date().getTime()
      };
      let docList = [];
      for (let index = 1; index <= post.size; index++) {
        let item = {
          "id": (post.page - 1) * post.size + index,
          "title": "文章标题",
          "authorName": "文章标题",
          "picUrl": tools.getAvater(),
          "portraitUrl": tools.getAvater(),
          "state": "W",
          "specialId": "1",
          "specialName": "所属专题名称",
          "pushTime": new Date().getTime(),
          "createTime": new Date().getTime()
        };
        docList.push(item);
      }
      item.contents = docList;
      return item;
    }
  }
];
