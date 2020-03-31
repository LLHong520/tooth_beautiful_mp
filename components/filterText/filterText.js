import utils from "../../utils/util";
Component({
  data:{
    resultStr:""
  },
  properties: {
    content: {
      type: String,
      value: "",
      observer: function(newVal, oldVal){
        this.transform();
      }
    },
    trans_to:{
      type: String,
      value: "text"
    }
  },
  methods: {
    transform(){
      let resultStr="";
      if(this.data.trans_to=="text"){
        resultStr=utils.getFormatStr(this.data.content);
      }
      this.setData({
        resultStr:resultStr
      });
    }
  },
  attached(){
    this.transform();
  }
});
// "usingComponents": {
//   "filter-text": "../../components/filterText/filterText"
// }
