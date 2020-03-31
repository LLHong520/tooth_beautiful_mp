import utils from "../../utils/util.js";
import userService from "../../services/userService.js";
import myToast from "../../components/showToast/showToast";
import pageCommonFns from "../../scripts/pageCommonFns.js";

//获取应用实例
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    userInfo: {
      nickName: "...",
    },
    coupon: "",
    islogin: false,
    showConfirm: false,
    showConfirmCoupon: false,
    showImgDefault: false,
  },
  _initPage() {
    if(this.checkLogin()){
      //登录了
      let This = this;
      This.setData({
        userInfo: Object.assign({}, app.globalData.userInfo),
        islogin: app.globalData.islogin,
        hide_loading: false
      });
    }
  },
  checkLogin(){
    if (!app.globalData.islogin) {
      // wx.redirectTo({
      //   url: "../login/login?refer=" + encodeURIComponent("pages/mine/mine")
      // });
      return false;
    } else {
      return true;
    }
  },
  confirmLogin(){
    if (app.globalData.islogin) return;
    wx.redirectTo({
      url: "../login/login?refer=" + encodeURIComponent("pages/mine/mine")
    });
  },
  toPage(event) {
    if (!this.checkLogin()){
      wx.redirectTo({
        url: "../login/login?refer=" + encodeURIComponent("pages/mine/mine")
      });
    };
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  //打开兑换优惠券弹窗
  openCoupon() {
    if(!this.checkLogin()){
      wx.redirectTo({
        url: "../login/login?refer=" + encodeURIComponent("pages/mine/mine")
      });
    };
    this.setData({
      showConfirmCoupon: true,
    });
  },
  confirm(e) {
    // console.log(e);
    let This = this;
    let coupon = e.detail;
    this.setData({
      coupon: coupon,
    });
    if (utils.isEmpty(coupon)) {
      myToast.show({
        title: "优惠券码不能为空！"
      });
      return;
    }
    userService.validCouPon({
      coupon_num: coupon,
    })
    .then(res => {
      if (res.code == 0) {
        This.setData({
          showConfirmCoupon: false,
        });
        This.addCoupon();
      }
    });
  },
  addCoupon() {
    let This = this;
    userService.addCouPon({
      coupon_num: This.data.coupon,
      unionId: app.globalData.unionId
    })
    .then(res => {
      if (res.code == 0) {
        myToast.show({
          title: "领取成功",
          content:"请在“已领取的优惠券”中查看",
          icon: "../../assets/success.png"
        });
      }else{
        myToast.show({
          title: "失败",
          content:"请确认领取信息是否正确",
          icon: "../../assets/warning.png"
        });
      }
    });
  },
  cancel(e) {
    this.setData({
      showConfirmCoupon: false,
      showConfirm: false
    });
  },
  onLoad: function () {},
  onShow() {
    this._initPage();
  }
};
Page(pageConfigs);
