import correctionService from "../../services/correctionService";
import utils from "../../utils/util";
import pageCommonFns from "../../scripts/pageCommonFns.js";
//获取应用实例
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    questionId: "",
    answersId: "",
    nickName:"",
    placeholder:"写评论...",
    count:200,
    loading: false,
    disabled: false,
  },
  checkLogin() {
    if (!app.globalData.islogin) {
      console.log(this.getCurrentPageUrlWithArgs());
      wx.redirectTo({
        url: "../login/login?refer=" + encodeURIComponent(this.getCurrentPageUrlWithArgs())
      });
      return false;
    } else {
      return true;
    }
  },
  formSubmit(event) {
    //是否登录
    if (!this.checkLogin()) return;
    let content = event.detail.value.content;
    let This = this;
    if (!This.data.answersId){
      This.data.answersId = "";
    }
    if (utils.isEmpty(content)) {
      let msg ="";
      if (This.data.answersId && This.data.answersId != "") { //回复评论
        msg = "请填写回复评论内容";
      }else{
        msg = "请填写评论内容"; //评论
      }
      wx.showToast({
        title: msg,
        icon: "none",
        mask: true
      });
      return;
    }
    if (utils.trim(content).length > 200) {
      wx.showToast({
        title: "内容限制200个字！",
        icon: "none",
        mask: true
      });
      return;
    }
    content = utils.getFormatFakeHtml(content);
    let paraData = {
      unionId: app.globalData.unionId,
      questionId: This.data.questionId,
      criticismId: This.data.answersId,
      content: content
    };
    this.setData({
      loading: true,
      disabled: true
    });
    correctionService.saveAnswer(paraData)
    .then((res) => {
      This.setData({
        loading: false,
        disabled: false
      });
      if (res.code == 0) {
        wx.showToast({
          title: "评论成功~",
          icon: "succes",
          mask: true
        });
        setTimeout(function () {
          This.toNavigateBack();
        }, 1000);
      }
    });
  },
  countTxt(e){
    this.setData({
      count:200-e.detail.cursor
    });
  },
  onLoad: function (option) {
    this.setData({
      questionId: option.questionId,
    });
    if (option.answersId != "") {
      this.setData({
        answersId: option.answersId,
        nickName: option.nickName
      });
    }
    // wx.setNavigationBarTitle({
    //   title: that.data.title //页面标题为路由参数
    // });
  },
  onShow: function () {
    if (this.data.answersId&&this.data.answersId != "") {
      this.setData({
        placeholder: "回复@" + this.data.nickName
      });
    }
  }
};
Page(pageConfigs);
