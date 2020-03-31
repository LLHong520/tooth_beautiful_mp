import userService from "../../services/userService";
import sysService from "../../services/sysService";
import myToast from "../../components/showToast/showToast";
import pageCommonFns from "../../scripts/pageCommonFns.js";
import WXBizDataCrypt from "../../utils/cryptojs-master/lib/RdWXBizDataCrypt.js";

//获取应用实例
var app = getApp();
var pageConfigs={
  ...pageCommonFns,
  globalData: {
    appId:"wxbae5ed9736d19fdc",
    secret:"a713a1b1d31b0c3cfe29dd4fc566a542"
  },
  data: {
    option:null,
    session_key:"",
    openid:"",
    userInfo:{},
    islogin:false,
    login_loading:false,
    login_fail:false,
    loginCode: "",
  },
  onLoad: function (option) {
    this.login_app();
    this.setData({
      option:option
    });
  },
  onShow:function(){
  },
  login_app(){
    var This=this;
    //调用登录接口
    wx.login({
      success:function(res){
        var code=res.code;
        console.log("----------");
        console.log(res.code);
        if(res.code){
          // This.getUserInfo(code);
          This.setData({
            loginCode: code
          });
        }else {
          // console.log("获取用户登录态失败！" + res.errMsg);
          myToast.show({title: "获取用户登录态失败！" + res.errMsg});
          This.setData({
            login_fail:true,
            login_loading: false,
          });

        }
      },
      fail(){
        // console.log("获取用户登录态失败！" + res.errMsg);
        myToast.show({title: "获取用户登录态失败！" + res.errMsg});
        This.setData({
          login_fail: true,
          login_loading: false,
        });
      }
    });
  },
  user_info_app() {
    this.getUserInfo(this.data.loginCode);
  },
  getUserInfo(code) {
    console.log("点击");
    
    if(this.data.login_loading) return;
    var This = this;
    This.setData({
      login_loading: true,
      login_fail: false
    });
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;//保存用户信息到全局
        This.setData({
          userInfo:res.userInfo
        });
        This.getOpenId(code, res);
      },
      fail() {
        This.setData({
          login_loading: false
        });
      }
    });
  },
  getOpenId(code,codeRes) {
    let This =this;
    sysService.sns({
      code:code
    }).then((res)=>{
      console.log("========");
      console.log(res);
      if(res.code == 0 && res.data){
        This.setData({
          openid: res.data.openId,
          session_key: res.data.session_key,
        });
      //解密
        var pc = new WXBizDataCrypt(This.globalData.appId, res.data.session_key);
        var data = pc.decryptData(codeRes.encryptedData, codeRes.iv);
        app.globalData.unionId = data.unionId;
        console.log("解密后 unionid: ", app.globalData.unionId);
        This.saveUserInfo();
      }else{
        This.setData({
          login_loading: false
        });        
      }   
    }).catch(()=>{
      This.setData({
        login_loading: false
      });
      myToast.show({
        title: "获取用户登录信息失败"
      });
      
    });
    // wx.request({
    //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=${This.globalData.appId}&secret=${This.globalData.secret}&js_code=${code}&grant_type=authorization_code`,
    //   data: {},
    //   header: {
    //     "content-type": "application/json"
    //   },
    //   success: function (res) {
    //     This.setData({
    //       openid: res.data.openid,
    //       session_key: res.data.session_key,
    //     });
    //     //解密
    //     var pc = new WXBizDataCrypt(This.globalData.appId, res.data.session_key);
    //     var data = pc.decryptData(codeRes.encryptedData, codeRes.iv);
    //     app.globalData.unionid = data.unionId;
    //     console.log("解密后 unionid: ", app.globalData.unionid);
    //     This.saveUserInfo();
    //   },
    //   fail: function (e) {
    //     This.setData({
    //       login_loading: false,
    //       login_fail: true
    //     });
    //     myToast.show({
    //       title: "获取用户登录信息失败"
    //     });
    //   }
    // });
  },
  saveUserInfo() {
    let This =this;
    userService.saveUserInfo({
      unionId: app.globalData.unionId,
      openId: This.data.openid,
      nickName: This.data.userInfo.nickName,
      sex: This.data.userInfo.gender,
      city: This.data.userInfo.city,
      province: This.data.userInfo.province,
      headimgurl: This.data.userInfo.avatarUrl,
    })
    .then(res => {
      if (res.code == 0) {
        wx.setStorageSync("unionId", app.globalData.unionId);
        wx.setStorageSync("userInfo", This.data.userInfo);
        app.globalData.islogin = true;
        console.log(res);
        console.log("保存用户信息成功");
        console.log(This.data.option);
        let url = This.data.option.refer;
        if (url){
          This.toRefer(url);
        }else{
          wx.switchTab({
            url: "../mine/mine",
            success() {},
            fail() {}
          });
        }
      }else{
        myToast.show({title: "登录失败，请稍后重试！"});
        This.setData({
          login_loading: false
        });
      }
    }).catch(() => {
      This.setData({
        login_loading: false
      });
      myToast.show({
        title: "登录失败，请稍后重试！"
      });

    });
  },
  //重新授权
  retry_login(){
    let This=this;
    if(wx.openSetting){
      wx.openSetting({
        success: (res)=>{
          if (res.authSetting["scope.userInfo"]) {
            This.login_app();
          } // 如果成功打开授权
          else {
            console.log("再次被拒");
          } // 如果用户依然拒绝授权
        },
        fail: function () { //调用失败，授权登录不成功
          //fail()
        }
      });
    }else {
      wx.showModal({
        title: "温馨提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  }
};
Page(pageConfigs);
