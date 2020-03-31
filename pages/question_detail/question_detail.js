import pageCommonFns from "../../scripts/pageCommonFns.js";
import myToast from "../../components/showToast/showToast";
import utils from "../../utils/util";
import WxParse from "../../wxParse/wxParse.js";
import correctionService from "../../services/correctionService.js";
//index.js
//获取应用实例
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    id:"",
    refUrl: "",
    commentType: null,//0代表评论，1代表回复
    showConfirm: false,
    detail: {},
    detail_content: "",
    hide_loading: true,
  },
  _initPage() {
    // wx.showNavigationBarLoading();
    this.get_detail();
  },
  get_detail() {
    var This = this;
    correctionService.correction_detail({
      id: This.data.id
    })
      .then(res => {
        if (res.code == 0) {
          This.setData({
            detail: res.data,
            hide_loading: true
          });
          res.data.content = utils.getFormatStr(res.data.content);
          WxParse.wxParse("detail_content", "html", res.data.content, This, 5);
        }
      });
  },
  checkLogin() {
    if (!app.globalData.islogin) {
      this.setData({
        showConfirm: true,
      });
      return false;
    } else {
      return true;
    }
  },
  confirmLogin() {
    if (app.globalData.islogin) return;//已登录
    var url = "";
    if (this.data.commentType==0) {
      url = "../login/login?refer=" + encodeURIComponent(this.data.refUrl);
    } else if (this.data.commentType == 1) {
      url = "../login/login?refer=" + encodeURIComponent(this.getCurrentPageUrlWithArgs());
    }
    wx.redirectTo({ //去登录
      url: url
    });
  },
  cancel() {
    this.setData({
      showConfirm: false,
    });
  },
  toComment(event) {
    var url = event.currentTarget.dataset.url;
    var type = event.currentTarget.dataset.type;
    this.setData({
      refUrl: url,
      commentType:type
    });
    if (this.data.commentType == 1) { //已经回复过了
      var answer = event.currentTarget.dataset.answer;
      if (answer.length > 0) {
        return;
      }
    } 
    if (event.currentTarget.dataset.id) {
      var currentUserId = event.currentTarget.dataset.id;
    }
    if (!this.checkLogin()){
      return;
    }else{
      if (this.data.commentType == 0) {
        url = "../../"+url;
      }else if (this.data.commentType == 1){
        console.log(currentUserId);
        console.log(app.globalData.unionId);
        if (currentUserId == app.globalData.unionId) { //不能评论自己
          myToast.show({
            title: "不能评论自己！"
          });
          return;
        }
      }
      wx.navigateTo({
        url: url
      });
    }
  },
  onReachBottom: function () {
    //页面滚动到底部回调函数
  },
  onLoad: function (option) {
    console.log(option);
    console.log(this.route);
    this.setData({
      id: option.id
    });
  },
  onShow: function () {
    this._initPage();
  },
  previewImg(event) {
    var index = event.currentTarget.dataset.index;
    wx.previewImage({
      urls: this.data.detail.img,
      current: this.data.detail.img[index],
    });
  }
};
Page(pageConfigs);
