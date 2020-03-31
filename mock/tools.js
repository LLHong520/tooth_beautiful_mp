function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function getAvater() {
  var avaters = [
    "http://img3.imgtn.bdimg.com/it/u=951120017,198117664&fm=26&gp=0.jpg",
    "http://img2.imgtn.bdimg.com/it/u=1264691874,4093398174&fm=26&gp=0.jpg",
    "http://img0.imgtn.bdimg.com/it/u=2206167463,3805924269&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=2530404822,1329936343&fm=26&gp=0.jpg",
    "http://img1.imgtn.bdimg.com/it/u=1339085380,1315199013&fm=26&gp=0.jpg",
    "http://img4.imgtn.bdimg.com/it/u=2204799450,2989319510&fm=26&gp=0.jpg",
    "http://img4.imgtn.bdimg.com/it/u=551626384,3347169024&fm=26&gp=0.jpg"
  ];
  return avaters[rand(0, 6)];
}

function getName() {
  var names = [
    "张三",
    "李四",
    "王五",
    "唐三藏",
    "孙悟空",
    "猪八戒",
    "观音菩萨"
  ];
  return names[rand(0, 6)];
}

function getTagType() {
  var names = [
    "反动",
    "危险",
    "伤害",
    "侵犯版权",
    "不利于大众",
    "有毒",
    "不好"
  ];
  return names[rand(0, 6)];
}

function getStatus() {
  var names = [
    "true",
    "false"
  ];
  return names[rand(0, 1)];
}

function getDocId() {
  var ids = [40, 139, 217, 63, 203, 68, 62, 162];
  return ids[this.rand(0, 7)];
}

module.exports = {
  getTagType,
  getStatus,
  getName,
  getAvater,
  rand,
  getDocId,
};
