import userService from "../../services/userService";
var app = getApp();
var pageConfigs = {
  data: {
    hide_loading: true,
    couponlist: {
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
  checkLogin() {
    if (!app.globalData.islogin) {
      wx.redirectTo({
        url: "../login/login?refer=" + encodeURIComponent("pages/coupon/coupon")
      });
      return false;
    } else {
      return true;
    }
  },
  get_coupon() {
    //是否登录
    if (!this.checkLogin()) return;
    if (!this.data.couponlist.hasMore) return;
    var This = this;
    This.data.couponlist.pager.pageIndex = This.data.couponlist.pager.pageIndex + 1;
    if (This.data.couponlist.pager.pageIndex == 1) {
      wx.stopPullDownRefresh();
      this.setData({
        hide_loading: false
      });
    } else {
      this.setData({
        "couponlist.load_more": true
      });
    };
    userService.findHospitalUserCouponList({
      page: This.data.couponlist.pager.pageIndex,
      size: This.data.couponlist.pager.pageSize,
      unionId: app.globalData.unionId
    })
    .then(res => {
      wx.hideNavigationBarLoading();
      if (This.data.couponlist.pager.pageIndex == 1) {
        This.setData({
          hide_loading: true
        });
      } else {
        This.setData({
          "couponlist.load_more": false
        });
      }
      if (res.code == 0 && res.data) {
        This.setData({
          "couponlist.list": This.data.couponlist.list.concat(res.data),
        });
        //确定没有更多时
        let total = Math.ceil(res.total / This.data.couponlist.pager.pageSize);
        if (This.data.couponlist.pager.pageIndex + 1 > total) {
          this.setData({
            "couponlist.load_more": false,
            "couponlist.noMoreDoc": true,
            "couponlist.load_text": "沒有更多了",
          });
        } else {
          this.setData({
            "couponlist.load_more": true,
            hide_loading: true
          });
        }
      }
    })
    .catch(res => {
      This.setData({
        "couponlist.load_more": false,
        hide_loading: true
      });
    });
  },
  intoCouponDetail(event) {
    let couponNum = event.currentTarget.dataset.num;
    wx.navigateTo({
      url: "../coupon_detail/coupon_detail?id=" + couponNum,
    });
  },
  onReachBottom: function () {
    //页面滚动到底部回调函数
    this.get_coupon();
  },
  onLoad: function () {},
  onShow: function () {
    this._initPage();
  },
  _initPage() {
    wx.showNavigationBarLoading();
    this.setData({
      "couponlist.list": [],
      "couponlist.pager.pageIndex": 0,
      "couponlist.hasMore": true,
      "couponlist.load_more": false,
      "couponlist.noMoreDoc": false,
    });
    this.get_coupon();
  },
  onPullDownRefresh: function () {
    this._initPage();
  }
};
Page(pageConfigs);
