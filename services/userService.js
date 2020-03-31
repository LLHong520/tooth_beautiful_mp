import request from "../request/request.js";
let userInterfaces={
  banner_list:"/banner/list",
  myinfo:"/u/home/qryInfo",
  saveInfo:"/u/home/qryInfo",
  saveUserInfo: "/user/addUser",
  couponDetail: "/userCoupon/couPonDetail",
  hospitalDetail: "/h/hospitalDetail",
  findHospitalUserCouponList : "/userCoupon/findHospitalUserCouponList",
  validCouPon: "/userCoupon/validateCouPon",
  addCouPon: "/userCoupon/addUserCoupon",
};

module.exports={
  //banner
  banner_list:function(data){
    let url = userInterfaces.banner_list;
    return request.post(url,data);
  },
  //用户个人信息
  myinfo:function(data){
    let url=userInterfaces.myinfo;
    return request.post(url,data);
  },
  //用户个人信息
  saveInfo: function (data) {
    let url = userInterfaces.saveInfo;
    return request.post(url,data);
  },
  //保存用户个人信息
  saveUserInfo: function (data) {
    let url = userInterfaces.saveUserInfo;
    return request.post(url,data);
  },
  //优惠券详情
  couponDetail: function (data) {
    let url = userInterfaces.couponDetail;
    return request.post(url, data);
  },
  //医院详情
  hospitalDetail: function (data) {
    let url = userInterfaces.hospitalDetail;
    return request.post(url, data);
  },
  //优惠券列表
  findHospitalUserCouponList: function (data) {
    let url = userInterfaces.findHospitalUserCouponList;
    return request.post(url, data);
  },
  //优惠券校验
  validCouPon: function (data) {
    let url = userInterfaces.validCouPon;
    return request.post(url, data);
  },
  //新增优惠券
  addCouPon: function (data) {
    let url = userInterfaces.addCouPon;
    return request.post(url, data);
  },
};
