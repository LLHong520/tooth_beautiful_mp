// import utils from "../../utils/util";
// import myToast from "../../components/showToast/showToast";
Component({
  data:{
    classFocus:"focus",
    numberVal: "",
  },
  properties: {
    cancelBtnText: {
      type: String,
      value: "取消"
    },
    confirmBtnText: {
      type: String,
      value: "确认"
    },
    title: {
      type: String,
      value: "1"
    },
    placeholder: {
      type: String,
      value: "2"
    },
    showImgDefault: {
      type: Boolean,
      value: true
    },
  },
  methods: {
    cancel(){
      this.triggerEvent("cancel", {});
    },
    confirm(){      
      this.triggerEvent("confirm", this.data.numberVal);
    },
    inputCall(e) {
      // console.log(e);
      this.setData({
        numberVal: e.detail.value
      });
    },
    focusCall() {
      // console.log("in");
      this.setData({
        classFocus:"inClass"
      });
    },
    blurCall(){
      this.setData({
        classFocus: "blurClass"
      });
    }
  }
});
