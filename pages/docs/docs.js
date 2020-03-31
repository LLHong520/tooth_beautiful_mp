import pageCommonFns from "../../scripts/pageCommonFns.js";
import utils from "../../utils/util";
import myToast from "../../components/showToast/showToast";
import docService from "../../services/docService";
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    showConfirm: false,
    hide_loading: true,
    showConfirmConsult: false,
    docId:"",
    doclist: {
      list: [],
      hasMore: true,
      load_more: false,
      load_text: "加载中...",
      noMoreDoc: false,
      pager: {
        pageSize: 10,
        pageIndex: 0,
      }
    }
  },
  get_docs() {
    if (!this.data.doclist.hasMore) return;
    var This = this;
    This.data.doclist.pager.pageIndex = This.data.doclist.pager.pageIndex + 1;
    if (This.data.doclist.pager.pageIndex == 1) {
      wx.stopPullDownRefresh();
      this.setData({
        hide_loading: false
      });
    } else {
      this.setData({
        "doclist.load_more": true
      });
    }
    docService.docs({
      page: This.data.doclist.pager.pageIndex,
      size: This.data.doclist.pager.pageSize
    })
    .then(res => {
      wx.hideNavigationBarLoading();
      if (This.data.doclist.pager.pageIndex == 1) {
        This.setData({
          hide_loading: true,
          "doclist.list": []
        });
      } else {
        This.setData({
          "doclist.load_more": false
        });
      }
      if (res.code == 0 && res.data) {
        This.setData({
          "doclist.list": This.data.doclist.list.concat(res.data),
        });
        wx.setStorage({
          key: "docs_docList",
          data: This.data.doclist.list,
          success(){
            console.log("设置成功！");            
          }
        });
        //确定没有更多时
        let total = Math.ceil(res.total / This.data.doclist.pager.pageSize);
        if (This.data.doclist.pager.pageIndex + 1 > total) {
          this.setData({
            "doclist.load_more": false,
            "doclist.noMoreDoc": true,
            "doclist.load_text": "沒有更多了",
          });
        } else {
          this.setData({
            "doclist.load_more": true,
            hide_loading: true
          });
        }
      }
    })
    .catch(res => {
      This.setData({
        "doclist.load_more": false,
        hide_loading: true
      });
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
    if (app.globalData.islogin) return;
    wx.redirectTo({
      url: "../login/login?refer=" + encodeURIComponent("pages/docs/docs")
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
    let This =this;
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
  onReachBottom: function () {
    //页面滚动到底部回调函数
    if (!this.data.doclist.noMoreDoc) {
      this.get_docs();
    }
  },
  onLoad: function () {
  },
  onShow: function () {
    this._initPage();
    this.setData({
      isShowIndexIcon: app.globalData.isShowIndexIcon,
    });
  },
  _initPage() {
    wx.showNavigationBarLoading();
    this.setData({
      "doclist.list": wx.getStorageSync("docs_docList") || []
    });
    this.setData({
      "doclist.pager.pageIndex": 0,
      "doclist.hasMore": true,
      "doclist.load_more": false,
      "doclist.noMoreDoc": false,
    });
    this.get_docs();
  },
  onPullDownRefresh: function () {
    this._initPage();
  }
};
Page(pageConfigs);
