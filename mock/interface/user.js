var tools = require("../tools.js");
module.exports = [
  {
    url: "/u/qryInfo",
    method: "POST",
    mockdata: (
      function () {
        var items = {
          "id": "59e071d884aeca351b98d26c",
          "nickName": "明天的幸福彩虹",
          "faceImage": "http://tva3.sinaimg.cn/crop.0.0.720.720.50/e05f2787jw8eejjjhtk5ej20k00k0mzl.jpg",
          "gender": "女",
          "topic": 5,
          "reply": 22,
          "posts": 27,
          "circles": 6,
          "followUsers": 0,
          "fansUsers": 2,
          "province": "江西",
          "wx": "wx12456",
          "wb": "wx12456",
          "city": "南昌",
          "isFollow": tools.rand(0, 1),
          "favorites": null,
          "phoneNumber": "13106549642",
          "isNickEdited": 1,
          "memberType": 1,
          "status": "normal",
          "credit": 268,
          "level": 1,
          "experience": 89
        };
        return items;
      }
    )()
  },
  {
    url: "/u/save",
    method: "POST",
    mockdata: (
      function () {
        var items = {
          "id": "59e071d884aeca351b98d26c",
          "nickName": "明天的幸福彩虹",
          "headimgurl": "http://tva3.sinaimg.cn/crop.0.0.720.720.50/e05f2787jw8eejjjhtk5ej20k00k0mzl.jpg",
          "sex": "女",
          "unionId": 5,
          "province": "江西",
          "city": "南昌",
        };
        return items;
      }
    )()
  },
  {
    url: "/banner/list",
    method: "POST",
    mockdata: (
      function () {
        var item = {
          "type": tools.rand(1,4),
          "img": "http://tva3.sinaimg.cn/crop.0.0.720.720.50/e05f2787jw8eejjjhtk5ej20k00k0mzl.jpg",
          "url": "https://www.baidu.com",
          "linkId": "123"
        };
        var items = [];
        for (var i = 0; i < 5; i++) {
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url: "/userCoupon/couPonDetail",
    method: "POST",
    mockdata: (
      function() {
        var item = {
          "begin_time": 1529337600000,
          "coupon_name": "新浪爱问医生1000元家庭爱牙无敌开心兴奋优惠券",
          "coupon_num": "15465590486",
          "coupon_status": 2,
          "create_time": 1536805050104,
          "end_time": 1530374399000,
          "hospitalIds": ["5afd3765eacecb27d88620b8", "5b022bca365e3e44f086013d"],
          "id": "5b99c865f577381668561e62",
          "platform_id": "5b2878e8a60fd714acaad3a6",
          "platform_name": "哈哈哈"
        }
        return item;
      }
    )()
  },
  {
    url: "/h/hospitalDetail",
    method: "POST",
    mockdata: (
      function() {
        var item = {
          "hospital_name": "深圳北大医院",
          "hospital_address": "深圳北大医院",
        }
        var items = [];
        for (var i = 0; i < 5; i++) {
          items.push(item);
        }
        return items;
      }
    )()
  }, {
    url: "/userCoupon/findHospitalUserCouponList",
    method: "POST",
    mockdata: (
      function () {
        var item = {
          "begin_time": 1533657600000,
          "coupon_name": "新浪爱问医生1000元家庭爱牙无敌开心 兴奋优惠券",
          "coupon_num": "a3786180204",
          "coupon_status": 1,
          "create_time": 1533717342681,
          "end_time": 1533916799000,
          "id": "5b6aab5e0af24d3cd463a64c",
          "platform_id": "5b6aa35b0af24d10c8184c68",
          "platform_name": "1000元家庭爱牙幸福健康成长现金券"
        }
        var items = [];
        for (var i = 0; i < 5; i++) {
          items.push(item);
        }
        return items;
      }
    )()
  }
];
