import request from "../request/request.js";
let topicInterfaces={
  hot_topics:"/posts/findByEverybodyIsLooking",
  topicinfo:"/posts/findByPostsId",
  topic_comments:"/posts/findReply",
  saveReadNum:"/posts/saveReadAmount",
  post_topic:"/posts/publish",
  edit_topic:"/posts/editPosts",
  upload: "/file/upload",
  img_remove:"/img/remove",
  sarch_post:"/posts/findPostsBySearchWord"
};

module.exports={
  //热门帖子 大家都在看
  hot_topics:function(data){
    let url=topicInterfaces.hot_topics;
    return request.post(url,data);
  },
  //查询帖子详情
  topicinfo:function(data){
    let url=topicInterfaces.topicinfo;
    return request.post(url,data);
  },
  //查询帖子下的评论
  topic_comments:function(data){
    let url=topicInterfaces.topic_comments;
    return request.post(url,data);
  },
  //保存帖子阅读数量
  saveReadNum: function (data) {
    let url=topicInterfaces.saveReadNum;
    return request.post(url, data);
  },
  //发帖操作
  post_topic: function (data) {
    let url=topicInterfaces.post_topic;
    return request.post(url, data);
  },
  //编辑帖字操作
  edit_topic: function (data) {
    let url=topicInterfaces.edit_topic;
    return request.post(url, data);
  },
  //发帖上传图片
  upload: function (data) {
    let url=topicInterfaces.upload;
    return request.postFile(url, data);
  },
  //帖子编辑删除图片
  img_remove: function (data) {
    let url=topicInterfaces.img_remove;
    return request.post(url, data);
  },
  //查询帖子
  sarch_post: function (data) {
    let url=topicInterfaces.sarch_post;
    return request.post(url, data);
  }
};
