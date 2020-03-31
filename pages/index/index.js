import pageCommonFns from "../../scripts/pageCommonFns.js";
import utils from "../../utils/util";
import myToast from "../../components/showToast/showToast";
import userService from "../../services/userService.js";
import articleService from "../../services/articleService.js";
import docService from "../../services/docService.js";
import correctionService from "../../services/correctionService.js";
//index.js
//获取应用实例
var app = getApp();
var pageConfigs={
  ...pageCommonFns,
  data: {
    showConfirmConsult: false,
    docId:"",
    banners: [{
      img: ""
    }, {
      img: ""
    }],
    artList:[],
    docList: [],
    caseList: [],
    knowledgeList: [],
    askList: [],
    hide_loading:true
  },
  _initPage() {
    wx.showNavigationBarLoading();
    this.get_banners();
    this.get_article();
    this.get_docs();
    this.get_correction_case();
    this.get_tooth_knowledge();
    this.get_correction_ask();
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
      url: "../login/login?refer=" + encodeURIComponent("pages/index/index")
    });
  },
  consult(event) {
    if (!this.checkLogin()) return;
    this.setData({
      showConfirmConsult: true,
      docId: event.currentTarget.dataset.id
    });
  },
  confirm(e) {
    let This = this;
    let phone = e.detail;
    if (utils.isEmpty(phone)) {
      myToast.show({
        title: "手机号码不能为空！"
      });
      return;
    }
    if (!utils.isMobile(phone)) {
      myToast.show({
        title: "手机号码格式错误！"
      });
      return;
    }
    docService.doc_consult({
      consult_phone: phone,
      doctor_id: This.data.docId,
      unionId: app.globalData.unionId
    })
    .then(res => {
      if (res.code == 0) {
        This.setData({
          showConfirmConsult: false,
        });
        myToast.show({
          title: "已发送",
          icon: "../../assets/success.png"
        });
      }
    });
  },
  cancel(e) {
    this.setData({
      showConfirm: false,
      showConfirmConsult: false
    });
  },
  get_banners(){
    var that = this;
    userService.banner_list({})
    .then(res => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      if (res.code == 0) {
        let list = res.data.filter((item)=>{
          return item.img != "";
        });
        that.setData({
          banners: list,
          hide_loading: true
        });
      }
    });
  },
  get_article() {
    var that = this;
    correctionService.specialList({
      page: 1,
      size:9
    })
    .then(res => {
      if (res.code == 0) {
        that.setData({
          artList: res.data,
          hide_loading: true
        });
      }
    });
  },
  get_docs() {
    var that = this;
    docService.docs({
      page: 1,
      size:9
    })
    .then(res => {
      if (res.code == 0) {
        that.setData({
          docList: res.data,
          hide_loading: true
        });
      }
    });
  },
  get_correction_case() {
    var that = this;
    correctionService.caseList({
      page: 1,
      size:2
    })
    .then(res => {
      if (res.code == 0) {
        that.setData({
          caseList: res.data,
          hide_loading: true
        });
      }
    });
  },
  get_tooth_knowledge() {
    var that = this;
    articleService.artList({
      page: 1,
      size:2
    })
    .then(res => {
      if (res.code == 0) {
        that.setData({
          knowledgeList: res.data,
          hide_loading: true
        });
      }
    });
  },
  get_correction_ask() {
    var that = this;
    correctionService.correctionAsk({
      page: 1,
      size:2
    })
    .then(res => {
      if (res.code == 0) {
        that.setData({
          askList: res.data,
          hide_loading: true
        });
      }
    });
  },
  tobannerPage: function (event) {
    var bannerItem = event.currentTarget.dataset.item;
    bannerItem.url = encodeURIComponent(bannerItem.url);
    switch (bannerItem.type) {
    case "1"://爱牙知识
      wx.navigateTo({
        url: "../../pages/article_detail/article_detail?id="+bannerItem.linkId+"&title=爱牙知识&type=1"
      });
      break;
    case "2"://爱牙活动
      wx.navigateTo({
        url: "../out_link/out_link?url=" + bannerItem.url
      });
      break;
    case "3"://调查福利
      wx.navigateTo({
        url: "../out_link/out_link?url=" + bannerItem.url
      });
      break;
    case "4"://矫正锦囊
      wx.navigateTo({
        url: "../find_lan/find_lan?id=" + bannerItem.linkId
      });
      break;
    case "5"://矫正案例
      wx.navigateTo({
        url: "../../pages/article_detail/article_detail?id=" + bannerItem.linkId + "&title=矫正案例&type=2"
      });
      break;
    case "6"://矫正问答
      wx.navigateTo({
        url: "../../pages/question_detail/question_detail?id=" + bannerItem.linkId
      });
      break;
    case "7"://本周明星医生
      wx.navigateTo({
        url: "../../pages/docs/docs"
      });
      break;
    default:
      wx.navigateTo({
        url: "../out_link/out_link?url=" + bannerItem.url
      });
      break;
    }
  },
  onReachBottom:function(){
    //页面滚动到底部回调函数
  },
  onLoad: function (option) {
    this.setData({
      "page_inited":true
    });
  },
  onShow: function () {
    this._initPage();
    this.setData({
      isShowIndexIcon: app.globalData.isShowIndexIcon,
    });
  },
  onPullDownRefresh:function(pos){
    this._initPage();
  }
};
Page(pageConfigs);
