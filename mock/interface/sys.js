var tools = require("../tools.js");
var consts = require("../consts.js");
module.exports = [
  {
    url: "/weixinShare/getWeixinApiTick",
    method: "POST",
    mockdata: {
      appId: "4444",
      timestamp: "4444",
      nonceStr: "4444",
      signature: "4444",
    }
  },
  {
    url: "/community/sys/qryCodeAndMsg",
    method: "POST",
    mockdata: {}
  },
  {
    url: "/list/city",
    method: "POST",
    mockdata: (() => {
      var str = "全国-北京市-天津市-上海市-重庆市-河北省-山西省-辽宁省-吉林省-黑龙江省-江苏省-浙江省-安徽省-福建省-江西省-山东省-河南省-湖北省-湖南省-广东省-海南省-四川省-贵州省-云南省-陕西省-甘肃省-青海省-台湾省-内蒙古自治区-广西壮族自治区-西藏自治区-宁夏回族自治区-新疆维吾尔自治区-香港特别行政区-澳门特别行政区";
      var arr = str.split("-");
      var result = [];
      arr.map((el, i) => {
        result.push({
          id: i + 1,
          name: el
        });
      });
      return result;
    })()
  },
  {
    url: "/change/city",
    method: "POST",
    mockdata: {}
  },
  {
    url: "/doctorArticles/findPage",
    method: "POST",
    mockdata: (
      function () {
        var item = {
          "articleType": "文章类型",
          "id": "28638386",
          "title": "医生说｜生二胎-为什么要让先生去检查身体？医生说｜生二胎-为什么要让先生去检查身体？",
          "coverPicture": tools.getAvater(),
          "hospital": "北京协和医院北京协和医院北京协和医院北京协和医院北京协和医院北京协和医院北京协和医院",
          "userId": "医生id",
          "userName": "张一元",
          "docTitle": "主任医师",
          "labelList": ["呼吸道感染", "呼吸道", "感染"]
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
    url: "/uploadImage/up",
    method: "POST",
    mockdata: {}
  },
  {
    url: "/uploadImage/up",
    method: "GET",
    handleEvent: function (post, query) {
      if (query.callback) {
        return {
          _isJsonp: true,
          data: `${query.callback}(${JSON.stringify({})})`
        };
      } else {
        return {};
      }
    }
  },
  {
    url: "/diseaseEncyclopedia/findDepartmentList",
    method: "POST",
    mockdata: consts.departmentList
  },
];
