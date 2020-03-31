import userService from "../../services/userService.js";
//获取应用实例
var app = getApp();
var pageConfigs = {
  data: {
    couponNum:"",
    couponObject: {},
    hospitalDetail: [],
  },
  get_detail() {
    var _this = this;
    userService.couponDetail({
      coupon_num: _this.data.couponNum
    })
    .then(res => {
      if (res.code == 0) {
        _this.setData({
          couponObject: res.data,
        });
        let hospitalId = res.data.hospitalIds.toString();
        _this.get_hostipal_detail(hospitalId);
      }
    });
  },
  get_hostipal_detail(hospitalId) {
    var _this = this;
    let data = {
      id: hospitalId
    };
    userService.hospitalDetail(data).then(res => {
      if (res.code == 0) {
        _this.setData({
          hospitalDetail: res.data,
        });
      }
    });
  },

  onReachBottom: function () {
    //页面滚动到底部回调函数
  },
  onLoad: function (option) {
    this.setData({
      couponNum: option.id,
    });
  },
  onShow: function () {
    this.get_detail();
  }
};
Page(pageConfigs);
