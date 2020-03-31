var tools = require("./tools.js");
var articlefaces = require("./interface/article.js");
var correctionfaces = require("./interface/correction.js");
var activitiesfaces = require("./interface/activities.js");
var userInterfaces = require("./interface/user.js");
var sysInterfaces = require("./interface/sys.js");
var doctorInterfaces = require("./interface/doctor.js");

//接口列表
var interfaces=[
  ...articlefaces,
  ...correctionfaces,
  ...activitiesfaces,
  ...userInterfaces,
  ...sysInterfaces,
  ...doctorInterfaces,
  {
    url:"/circle/qryCategory",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "59b25f2684aed84b755044aa",
            categoryName: "风湿科",
            parentId: null,
            circleCategoryUIList: [],
            departmentId: "10508",
            departmentName: "风湿科",
            circleList: []
          };
          var c_item={
            id: "59b25fd684aed84b755044b8",
            joinStatus: true,
            circleName: "风湿科圈",
            circlePhoto: null
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            for (var j = 0; j <10; j++) {
              item.circleList.push(c_item);
            }
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/circle/qryHotCircleNew",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "599d07a784ae1d8476a49d4e",
            circleName: " 眼科圈",
            circlePhoto: "37243129",
            joinStatus: false,
            postsTempList: null,
            circleIntroduction: ""
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/ad/qryad",
    method:"GET",
    mockdata:{
      "id": "59fa8d9884ae0d9fc4086142",
      "category": "C304",
      "title": "骨骼圈帖子列表广告1骨骼圈帖子列表广告1骨骼圈帖子列表广告1",
      "picId": tools.getAvater(),
      "picLink": "http://www.baidu.com",
      "mode": "0"
    }
  }
 ,
  {
    url:"/ad/qryBanner",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "59f9719384ae44050541565c",
            bannerImage: "458872173",
            url: ""
          };
          var items=[];
          for (var i = 0; i <5; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/circle/qryHotPosts",
    method:"get",
    mockdata:(
        function(){
          var item={
            "id": "5a05624784aee8e2d5589968",
            "title": "你好吗，我很好",
            "authorId": "57c672de0cf2501fec2dfd5f",
            "authorNick": "Lily_guo",
            "imgList": [
              "38402919",
              "38424920"
            ],
            "doctorFlag": true,
            "readVirtualAmount": 16,
            "recoveryAmount": 4,
            "circleId": "599bfdd584aea001deab9621",
            "circleName": "骨骼圈",
            "createTime": "11-10"
          };
          var items=[];
          for (var i = 0; i <15; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/hotword/qryWords",
    method:"post",
    mockdata:["健康","京东","哇哈哈","cba","t","d","这是什么","不知道","怎么发帖","不知道+1"]
  }
 ,
  {
    url:"/circle/qryCircleBySearchWord",
    method:"post",
    mockdata:(
        function(){
          var item={
            "id": "59f7e0ed84aea357740ae4d5",
            "circleName": "新热门圈",
            "circlePhoto": null
          };
          var items=[];
          for (var i = 0; i <15; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/posts/findPostsBySearchWord",
    method:"post",
    mockdata:(
        function(){
          var item={
            "id": "5a05624784aee8e2d5589968",
            "title": "你好吗，我很好",
            "authorId": "57c672de0cf2501fec2dfd5f",
            "authorNick": "Lily_guo",
            "imgList": [
              "38402919",
              "38424920"
            ],
            "doctorFlag": true,
            "readVirtualAmount": 16,
            "recoveryAmount": 4,
            "circleId": "599bfdd584aea001deab9621",
            "circleName": "骨骼圈",
            "createTime": "11-10"
          };
          var items=[];
          for (var i = 0; i <15; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/u/qryDummyUsers",
    method:"post",
    mockdata:(
        function(){
          var item={
            "id": "59c3716584ae9ebc1af6ecc7",
            "nickName": "嘿嘿嘿111",
            "faceImage": "380739566",
            "gender": null,
            "phoneNumber": null,
            "bindFlag": true,
            "remark": "发对付对付对付地方的发地方打开了房间的",
            "noReadMesCount": 0
          };
          var items=[];
          for (var i = 0; i <15; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/u/qryMessages",
    method:"post",
    mockdata:(
        function(){
          var item={
            "id": "5a05721f84aee8e2d558998a",
            "title": "回复帖子",
            "content": "狂奔的蜗牛111在【骨骼圈】回复了《今天话咖啡壶的看法活动开始疯狂到货付款的话疯狂到货付款的话顺丰快递很舒服客户打款司法活动开始疯狂的》",
            "createTimeStr": "2017-11-10 17:32",
            "readStatus": false,
            "url": "/t/5a0440ed84aeeb110a6217d4?floor=2",
            "urlType": "0",
            "bindFlag": false
          };
          var items=[];
          for (var i = 0; i <15; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  }
 ,
  {
    url:"/u/qryMes",
    method:"post",
    mockdata:{
      "id": "5a09238884aed611793f47af",
      "title": "发布帖子",
      "content": "狂奔的蜗牛111在【骨骼圈】发布了新的帖子",
      "createTimeStr": "2017-11-13 12:46",
      "readStatus": false,
      "url": "/t/5a09238784aed611793f47a5",
      "urlType": "0",
      "bindFlag": false
    }
  } ,
  {
    url:"/circleManage/center",
    method:"post",
    mockdata:{
      "memberNum":tools.rand(0,500),
      "accusationNum":tools.rand(0,500),
      "recycleNum":tools.rand(0,500),
      "denyUserNum":tools.rand(0,500)
    }
  },
  {
    url:"/circleManage/adminUser",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
         "faceImage":tools.getAvater(),
         "nickName":tools.getName(),
         "userId":"4444444"
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/activeUser",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
         "userId":"5764454",
         "nickName":tools.getName(),
         "faceImage":tools.getAvater(),
         "topic":tools.rand(0,1000),
         "reply":tools.rand(0,1000),
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/circleUser",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
         "userId":"5764454",
         "nickName":tools.getName(),
         "faceImage":tools.getAvater(),
         "topic":tools.rand(0,1000),
         "reply":tools.rand(0,1000),
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/accusation/qryInfo",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
         "id": "45565655",
         "postsType":tools.rand(1,2),
         "postsId": "462255",
         "circleId": "59c3716584ae9ebc1af6ecc7",
         "accusationUserId": "599ab2f384ae772c56a51731",
         "accusationUserName": tools.getName(),
         "accusationTime": "2017-10-28 10:10:00",
         "accusationType": tools.getTagType(),
         "accusationContent": "法规发生分化加剧经济数据，内容太低俗，要求删除",
         "accusationNumber": tools.rand(1,10)
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/accusation/handle",
    method:"post",
    mockdata:(
     function(){
       var items=tools.getStatus();
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/qryRecyclePost",
    method:"post",
    mockdata:(
     function(){
       var data={
         result:[],
         totalCount:49,
         nowPage:1,
         totalPage:5,
       };
       var item= {
         "circleId":"599e763d84ae6739b2e7f0f5",
         "id":"59acc67584ae12d243dc38d6",
         "title":"呼吸疾病圈第三篇",
         "authorId":"57c672de0cf2501fec2dfd5f",
         "authorNick":"Lily_1112",
         "createTime":"2017-09-04 11:20"
       };
       for (var i = 0; i <10; i++) {
         data.result.push(item);
       }
       return data;
     }
   )()
  },
  {
    url:"/circleManage/editRecyclePost",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/qryRecycleReply",
    method:"post",
    mockdata:(
     function(){
       var data={
         result:[],
         totalCount:49,
         nowPage:1,
         totalPage:5,
       };
       var item= {
         "postsId":"59acc66a84ae12d243dc38d3",
         "replyId":"455de4a5ddd40e3058cfff726f3faeb4",
         "userId":"57c672de0cf2501fec2dfd5f",
         "userName":tools.getName(),
         "title":"从撒个谎促进本地实际功耗喝酒啊好多好多好多好多结婚时就会打电话到花花世界雕塑大会",
         "content":"哈哈",
         "createTime":"2017-09-05 11:25:53",
         "floor":tools.rand(1,50),
         "status":"0"
       };
       for (var i = 0; i <10; i++) {
         data.result.push(item);
       }
       return data;
     }
   )()
  }
 ,
  {
    url:"/circleManage/editRecycleReply",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/dplist",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
         "userId": "57c672de0cf2501fec2dfd5f",
         "nickName": tools.getName(),
         "faceImage": tools.getAvater(),
         "createTime": tools.rand(5,100),
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
  {
    url:"/circleManage/denyuser",
    method:"post",
    mockdata:(
     function(){
       var items=[];
       var item= {
       };
       for (var i = 0; i <10; i++) {
         items.push(item);
       }
       return items;
     }
   )()
  }
 ,
 //公益咨询部分
  {
    url:"/commonweal",
    method:"post",
    mockdata:(
    function(){
      var items=[];
      var item= {
        "id":"57c672de0cf2501fec2dfd5f",
        "actId":"59acc66a84ae12d243dc38d3",
        "actType":"爱牙公益活动主题",
        "actStatus":tools.rand(0,2),
        "title":"爱牙公益活动名称",
        "startTime":"2017-12-13",
        "endTime":"2018-2-2",
        "desc":"活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍",
        "coverImg":tools.getAvater(),
        "createTime":"2017-12-13"
      };
      for (var i = 0; i <10; i++) {
        items.push(item);
      }
      return items;
    }
  )()
  }
  ,
  {
    url:"/u/qryFans",
    method:"post",
    mockdata:{
      totalCount:20,
      totalPage:12,
      nowPage:12,
      result:(
        function(){
          var users=[];
          for (var i = 0; i <10; i++) {
            users.push({
              faceImage:tools.getAvater(),
              nickName:tools.getName(),
              userId:"4444444"
            });
          }
          return users;
        }
      )()
    }
  }
  ,
  {
    url:"/u/qryFavorite",
    method:"get",
    mockdata:{
      totalCount:20,
      totalPage:12,
      nowPage:12,
      result:(
        function(){
          var users=[];
          for (var i = 0; i <10; i++) {
            users.push({
              id:i,
              authorNick:tools.getName(),
              title:"我是标题",
              recoveryAmount:tools.rand(0,100)
            });
          }
          return users;
        }
      )()
    }
  },
  {
    url:"/posts/findByPostsId",
    method:"POST",
    mockdata:(function(){
      var data={
        "circleId": "599bfdd584aea001deab9621",
        "circleName": "骨骼圈",
        "authorId": "57c672de0cf2501fec2dfd5f",
        "authorNick": "Lily_guo",
        "authorHeadImg": tools.getAvater(),
        "id": "5a1e843484ae3c5561af5c4b",
        "title": "发的附近的路附近\"1111\"",
        "content": "对了放假了附近的”对付对付对付“，、、\"你好吗？\"都发就发两地分居德拉吉拉‘’'abc'!!!!!////||\\\\\\\"efdsfd \"fdlkfjldj~~~~!!!@#@#@#@$#@$%$^%$&^*^&*&(*)*())({P}{}{短发的广泛的功夫功夫高|||的多发的说法}【多发的说法地方的地方地方】！！：：”“‘：；；‘dfdf 激发灵感进料加工覆盖 //。。。。...........fdfdkfdf’",
        "createTime": "11-29 17:56",
        "imgList": [
          tools.getAvater()
        ],
        "tagList": [],
        "status": "1",
        "isEssence": 0,
        "isTop": 0,
        "isRecommend": 0,
        "recommenderUserId": null,
        "recommenderUserName": null,
        "recommenderUserType": null,
        "critique": null,
        "adminModifyRecord": null,
        "readVirtualAmount": 4,
        "recoveryAmount": 0,
        "hugAmount": 0,
        "hasHug": 0,
        "hasEnshrine": 0,
        "isFollow": "1",
        "isAccusation": "0",
        "rewardCreditRecord": [],
        "isHasCredit": "0",
        "creditList": [
          25,
          -15,
          10,
          20,
          5,
          5,
          8,
          9
        ]
      };
      if(tools.rand(0,1)===0){
        data.actId="5a0440ed84aeeb110a6217d4";
        data.actType="義診日";
        data.isPublic=tools.rand(0,1);
        data.sex="男";
        data.age=tools.rand(1,100);
      }
      return data;
    })()
  }
];

module.exports=interfaces;
