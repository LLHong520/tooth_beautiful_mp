import utils from "/utils/util.js";
var userService = require("/services/userService.js");
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var unionId = wx.getStorageSync("unionId") || null;
    var userInfo = wx.getStorageSync("userInfo") || null;
    if (unionId){
      this.globalData.islogin=true;
      this.globalData.unionId = unionId;
      this.globalData.userInfo=userInfo;
      if(userInfo){
        this.updateState(userInfo);
      }
    }
    this.getSystemInfo();
  },
  onShow(res){
    //显示返回主页的场景值
    var scenes=[1007,1008,1036,1043,1096];
    if(res){
      // console.log(res.scene);
      // console.log(res.path);
      // console.log(res.query);
      //配置显示返回主页的场景
      var isShowIndexIcon=scenes.some((item)=>{
        return item==res.scene;
      });
      if(isShowIndexIcon){
        this.globalData.isShowIndexIcon=true;
      }
      if (res.path) {
        //获取进入场景的查询字符串
        var queryStr="";
        if(res.query){
          queryStr+="?";
          for(var key in res.query){
            queryStr+=key+"="+res.query[key];
          }
        }
        //修正查询字符串
        queryStr=queryStr=="?"? "":queryStr;
        //存储来源地址
        this.globalData.referUrl = encodeURIComponent(res.path+queryStr);
        // console.log(this.globalData.referUrl);
      }
    }
    //应用被显示则更新用户信息
    var unionId = wx.getStorageSync("unionId") || null;
    var userInfo = wx.getStorageSync("userInfo") || null;
    if (unionId) {
      this.globalData.islogin=true;
      this.globalData.unionId = unionId;
      this.globalData.userInfo=userInfo;
      // this.getUserInfo();
    }
  },
  getUserInfo:function(cb){
    var that=this;
    userService.myinfo({}).then(res=>{
      if(res.code==0){
        let userInfo=res.data;
        that.updateState(userInfo);
      }
    });
  },
  updateState(userInfo){
    var that=this;
    this.globalData.userInfo=userInfo;
    wx.setStorageSync("userInfo", userInfo);
  },
  getSystemInfo(){
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        let sysInfo=res;
        sysInfo.isiOS=(function(){
          return sysInfo.system.toLowerCase().indexOf("ios") >= 0 ? true:false;
        })();
        sysInfo.isAndroid=(function(){
          return sysInfo.system.toLowerCase().indexOf("android") >= 0 ? true:false;
        })();
        that.globalData.sysInfo=sysInfo;
      }
    });
  },
  globalData:{
    userInfo:null,
    unionId:"",
    islogin:false,
    sysInfo:null,
    isShowIndexIcon:false,//是否在页面上显示返回主页按钮
    referUrl:""//进入小程序的链接
  }
});
