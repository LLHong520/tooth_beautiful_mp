import pageCommonFns from "../../scripts/pageCommonFns.js";
import utils from "../../utils/util";
import WxParse from "../../wxParse/wxParse.js";
import articleService from "../../services/articleService.js";
import correctionService from "../../services/correctionService.js";
var app = getApp();
var pageConfigs = {
  ...pageCommonFns,
  data: {
    id:"",
    artType:null,
    artTitle:"",
    articleDetail:{
      pushTime:"0000"
    },
    diseaseInfo: {
      qcontent:"",
      qneed:"",
      acontent:"",
      drPic:""
    },
    replyTemArray: [],
    article_content: "",
    hide_loading:true
  },
  _initPage(){
    if (this.data.artType==1) {//爱牙知识
      this.get_knowledge_detail();
    }else if (this.data.artType==2) {//矫正案例
      this.get_case_detail();
    }
  },
  get_case_detail() {
    var This = this;
    correctionService.details({
      id: This.data.id
    })
    .then(res => {
      if (res.code == 0) {
        This.setData({
          articleDetail: res.data,
          hide_loading: true
        });
        res.data.content = utils.getFormatStr(res.data.content); //文章内容
        WxParse.wxParse("article_content", "html", res.data.content, This, 5);
        if (res.data.diseaseCase && res.data.diseaseCase.id) {
          This.setData({
            diseaseInfo: res.data.diseaseCase,
          });
          let disease = res.data.diseaseCase;
          utils.getFormatStr(disease.qcontent); //病情描述
          WxParse.wxParse("diseaseInfo.qcontent", "html", disease.qcontent, This, 5);
          utils.getFormatStr(disease.qneed); //希望获得的帮助
          WxParse.wxParse("diseaseInfo.qneed", "html", disease.qneed, This, 5);
          utils.getFormatStr(disease.acontent); //医生解答
          WxParse.wxParse("diseaseInfo.acontent", "html", disease.acontent, This, 5);
          if (disease.dialogs.length>0){
            This.HtmlFormat(disease.dialogs);
          }
        }
      }
    });
  },
  HtmlFormat(replyArr) {//解析多条HTML数据
    var that = this;
    let arr = [];
    for (let i = 0; i < replyArr.length; i++) {
      arr.push(replyArr[i].content);
      WxParse.wxParse("reply" + i, "html", arr[i], that);
      if (i === arr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray", "reply", arr.length, that);
      }
    }
  },
  get_knowledge_detail() {
    var This = this;
    articleService.detail({
      id: This.data.id
    })
    .then(res => {
      if (res.code == 0) {
        This.setData({
          articleDetail: res.data,
          hide_loading: true
        });
        res.data.content = utils.getFormatStr(res.data.content);
        WxParse.wxParse("article_content", "html", res.data.content, This, 5);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      id: option.id,
      artType: option.type,
      artTitle: option.title,
    });
    this._initPage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isShowIndexIcon: app.globalData.isShowIndexIcon,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
};
Page(pageConfigs);