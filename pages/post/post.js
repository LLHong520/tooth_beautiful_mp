import correctionService from "../../services/correctionService";
import sysService from "../../services/sysService";
import utils from "../../utils/util";
import pageCommonFns from "../../scripts/pageCommonFns.js";
//获取应用实例
var app = getApp();
var pageConfigs={
  ...pageCommonFns,
  data: {
    option:{},
    momentInfo:{},
    loading:false,
    disabled:false,
    imgFiles:[],
    tagIndex:-1,
    checkTags:[],
    imgIds:[],
  },
  //事件处理函数
  delImg(event) {
    let index=event.currentTarget.dataset.index;
    let This=this;
    if(this.data.imgFiles[index].status==2){
      wx.showToast({
        title: "图片上传中，请上传成功后删除~",
        icon: "none",
        mask: true
      });
      return;
    }
    if(this.data.imgFiles[index].status==1){
      let oldArr = This.data.imgFiles;
      let oldIdArr = This.data.imgIds;
      oldArr.splice(index, 1);
      oldIdArr.splice(index, 1);
      This.setData({
        imgFiles: oldArr,
        imgIds: oldIdArr,
      });
    }else{
      let oldArr=This.data.imgFiles;
      let oldIdArr=This.data.imgIds;
      oldArr.splice(index,1);
      oldIdArr.splice(index,1);
      This.setData({
        imgFiles:oldArr,
        imgIds:oldIdArr,
      });
    }
  },
  chooseImg(){
    let This=this;
    if(This.data.imgFiles.length==5){
      wx.showToast({
        title: "您最多只能选择5张图片~",
        icon: "none",
        mask: true
      });
      return;
    }
    wx.chooseImage({
      count: 5-This.data.imgFiles.length, // 默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize > 2000000) { //图片大小限制
          wx.showToast({
            title: "图片大小不能超过2M,请选择正确的图片~",
            icon: "none",
            mask: true
          });
          return;
        }
        var tempFilePaths =[];
        res.tempFilePaths.map((item)=>{
          let ele={
            url:item,
            status:0
          };
          tempFilePaths.push(ele);
        });
        let choosed_files=This.data.imgFiles.concat(tempFilePaths);
        This.setData({
          imgFiles:choosed_files
        });
        for (var i = 0; i < This.data.imgFiles.length; i++) {
          if(This.data.imgFiles[i].status==0){
            This.uploadImage(This.data.imgFiles[i].url,i);
          }
        }
      }
    });
  },
  uploadImage(url,index){
    let This=this;
    let fd={
      filePath:url
    }; 
    sysService.upload(fd).then((res) => {
      res=JSON.parse(res);
      if (res.code == 0) {
        let attr="imgFiles["+index+"].status";
        let propObj={};
        propObj[attr]=1;
        This.data.imgIds.push(res.data.realFilePath);
        This.setData(propObj);
        This.setData({
          imgIds:This.data.imgIds
        });
      }
    })
    .catch(res=>{
      This.imgs[index].status=-1;
      This.$toast.tip("上传失败！");
    });
  },
  previewImages(event){
    let url=event.currentTarget.dataset.url;
    let urlArr=[];
    this.data.imgFiles.map(item=>{
      urlArr.push(item.url);
    });
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urlArr// 需要预览的图片http链接列表
    });
  },
  checkLogin() {
    if (!app.globalData.islogin) {
      wx.redirectTo({
        url: "../login/login?refer=" + encodeURIComponent("pages/post/post")
      });
      return false;
    } else {
      return true;
    }
  },
  formSubmit(event){
    //是否登录
    if(!this.checkLogin()) return;
    //判断是否所有图片都已上传成功
    if (this.data.imgFiles.length>0) {
      let isAllUploadSuc=this.data.imgFiles.every(function(item){
        return item.status==1;
      });
      if(!isAllUploadSuc){
        wx.showToast({
          title: "图片上传成功才可以发布哦~请稍候...",
          icon: "none",
          mask: true
        });
        return;
      }
    }
    let content=event.detail.value.content;
    let title=event.detail.value.title;
    let This=this;
    //回复帖子
    if(utils.isEmpty(title)){
      wx.showToast({
        title: "请填写标题",
        icon: "none",
        mask: true
      });
      return ;
    }
    if (utils.trim(title).length > 100) {
      wx.showToast({
        title: "标题限制100个字！",
        icon: "none",
        mask: true
      });
      return;
    }
    if(utils.isEmpty(content)){
      wx.showToast({
        title: "请填写内容",
        icon: "none",
        mask: true
      });
      return ;
    }
    if(utils.trim(content).length>500){
      wx.showToast({
        title: "内容限制500个字！",
        icon: "none",
        mask: true
      });
      return ;
    }
    content=utils.getFormatFakeHtml(content);
    let paraData={
      unionId: app.globalData.unionId,
      title: title,
      content: content,
      img: This.data.imgIds
    };
    if(this.data.imgIds.length>0){
      paraData.img = this.data.imgIds.join(",");
    }
    this.setData({
      loading:true,
      disabled:true,
      hide_loading: true
    });
    correctionService.saveQuestion(paraData)
    .then((res)=>{
      This.setData({
        loading:false,
        disabled:false
      });
      if(res.code==0){
        wx.showToast({
          title: "发布成功",
          icon: "succes",
          mask: true
        });
        setTimeout(function () {
          wx.redirectTo({
            url: "/pages/question_detail/question_detail?id=" + res.data.id
          });
        }, 500);
        //增加标记
        // wx.setStorageSync("need_refresh_minfo",true);
      }
    });
  },
  onLoad: function (option) {
    this.setData({
      option: option
    });
  }
};
Page(pageConfigs);
