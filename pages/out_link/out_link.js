//获取应用实例
var pageConfigs={
  data: {
    url:""
  },
  onReachBottom: function (){},
  onLoad: function (option) {
    var url = option.url;
    url = decodeURIComponent(url);
    if (url == "https://www.991kang.com/awyh/art/59be08aae4b03a53ce5a48c0.html?contentType=1") {
      url = "https://wj.qq.com/s/2718111/deb9";
    }
    if(option.url.indexOf("http")<0){
      url = "https://" + option.url;
    }
    this.setData({
      url: url,
    });
  },
  onShow: function () {},
};
Page(pageConfigs);
