import pageCommonFns from "../../scripts/pageCommonFns.js";
import correctionService from "../../services/correctionService.js";
//index.js
//获取应用实例
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    showConfirm:false,
    hide_loading: true,
    article: {
      list: [],
      hasMore: true,
      load_more: false,
      load_text: "加载中...",
      noMoreArticle: false,
      pager: {
        pageSize: 10,
        pageIndex: 0,
      }
    }
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
    if (app.globalData.islogin) return;
    wx.redirectTo({
      url: "../login/login?refer=" + encodeURIComponent("pages/post/post")
    });
  },
  cancel() {
    this.setData({
      showConfirm: false,
    });
  },
  toPage(event) {
    if (!this.checkLogin()) return;
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  get_article() {
    if (!this.data.article.hasMore) return;
    var This = this;
    This.data.article.pager.pageIndex = This.data.article.pager.pageIndex + 1;
    if (This.data.article.pager.pageIndex == 1) {
      wx.stopPullDownRefresh();
      this.setData({
        hide_loading: false
      });
    } else {
      this.setData({
        "article.load_more": true
      });
    }
    correctionService.correctionAsk({
      page: This.data.article.pager.pageIndex,
      size: This.data.article.pager.pageSize
    })
    .then(res => {
      wx.hideNavigationBarLoading();
      if (This.data.article.pager.pageIndex == 1) {
        This.setData({
          hide_loading: true
        });
      } else {
        This.setData({
          "article.load_more": false
        });
      }
      if (res.code == 0 && res.data) {
        This.setData({
          "article.list": This.data.article.list.concat(res.data),
        });
        //确定没有更多时
        let total = Math.ceil(res.total / This.data.article.pager.pageSize);
        if (This.data.article.pager.pageIndex + 1 > total) {
          this.setData({
            "article.load_more": false,
            "article.noMoreArticle": true,
            "article.load_text": "沒有更多了",
          });
        } else {
          this.setData({
            "article.load_more": true,
            hide_loading: true
          });
        }
      }
    })
    .catch(res => {
      This.setData({
        "article.load_more": false,
        hide_loading: true
      });
    });
  },
  onReachBottom: function () {
    //页面滚动到底部回调函数
    if (!this.data.article.noMoreArticle) {
      this.get_article();
    }
  },
  onLoad: function () {},
  onShow: function () {
    this._initPage();
    this.setData({
      isShowIndexIcon: app.globalData.isShowIndexIcon,
    });
  },
  _initPage() {
    wx.showNavigationBarLoading();
    this.setData({
      "article.list": [],
      "article.pager.pageIndex": 0,
      "article.hasMore": true,
      "article.load_more": false,
      "article.noMoreArticle": false,
    });
    this.get_article();
  },
  onPullDownRefresh: function () {
    this._initPage();
  }
};
Page(pageConfigs);
