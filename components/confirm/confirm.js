Component({
  data:{},
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
    }
  },
  methods: {
    cancel(){
      this.triggerEvent("cancel", {});
    },
    confirm(event){
      this.triggerEvent("confirm", event);
    }
  }
});
