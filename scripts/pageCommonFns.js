//是否是底部导航
function isTabPage(url){
  if(url==null||url=="") return false;
  var tabArr = ["pages/index", "pages/find", "pages/docs", "pages/mine"];
  var isTab=false;
  for (var i = 0; i < tabArr.length; i++) {
    if(url.indexOf(tabArr[i])>=0){
      isTab=true;
      break;
    }
  }
  return isTab;
}


//跳转到某个页面
function navigateTo(url){
  if(!isTabPage(url)){
    wx.navigateTo({
      url: url,
      success(){
        // app.globalData.referUrl="";
      },
      fail(){
      }
    });
  }else{
    wx.switchTab({
      url: url,
      success(){
        app.globalData.referUrl="";
      },
      fail(){
      }
    });
  }
}

//重定向到某个页面
function redirectTo(url){
  if(!isTabPage(url)){
    wx.redirectTo({
      url: url,
      success(){
        // app.globalData.referUrl="";
      },
      fail(){}
    });
  }else{
    wx.switchTab({
      url: url,
      success(){
        app.globalData.referUrl="";
      },
      fail(){}
    });
  }
}

var app=getApp();

var functions={
  toAppRefer:function(url){
    // console.log("跳转场景 refer");
    redirectTo.call(this,"../../"+decodeURIComponent(url));
  },
  toRefer:function(url){
    // console.log("跳转页面内 refer");
    redirectTo.call(this,"../../"+decodeURIComponent(url));
  },
  //跳转站内页面
  toSomePage: function(event) {
    var url = event.currentTarget.dataset.url;
    navigateTo(url);
  },
  //跳转外链
  toOutLink: function(event) {
    var url = event.currentTarget.dataset.url;
    url = encodeURIComponent(url);
    wx.navigateTo({
      url: "../../pages/out_link/out_link?url=" + url
    });
  },
  //跳转首页
  toIndexPage(){
    wx.switchTab({
      url: "../index/index",
      success(){},
      fail(){}
    });
  },
  //返回
  toNavigateBack(){
    wx.navigateBack({
      delta: 1
    });
  },
  /*获取当前页url*/
  getCurrentPageUrl() {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1];//获取当前页面的对象
    var url = currentPage.route;//当前页面url
    return url;
  },
  /*获取当前页带参数的url*/
  getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages();//获取加载的页面
    var currentPage = pages[pages.length - 1];//获取当前页面的对象
    var url = currentPage.route;//当前页面url
    var options = currentPage.options;//如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + "?";
    for (var key in options) {
      var value = options[key];
      urlWithArgs += key + "=" + value + "&";
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);

    return urlWithArgs;
  }
};
module.exports=functions;
