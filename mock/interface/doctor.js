var tools = require("../tools.js");
module.exports = [
  {
    url: "/doctor/findPage",
    method: "post",
    mockdata: (
      function () {
        var items = [];
        for (var i = 0; i < 5; i++) {
          var item = {
            "id": i,
            "name": "张医生",
            "introduce": "就职于深圳医科大擅长各种疑难杂症",
            "label": ["头痛", "头痛2", "头痛3", "头痛3","头痛3"],
            "img": "https://pic.wenwo.com/fimg/3272993.jpg"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url: "/consult/addConsult",
    method: "post",
    mockdata: (
      function () {
        var item = {
          "consult_phone": "123", //咨询电话
          "consult_time": 1536115983976, //咨询时间
          "doctor_id": "123", //医生id 
          "id": "5b8f450fc162bd3ef856c5f6",
          "unionId": "123"
        };
        return item;
      }
    )()
  },
];
