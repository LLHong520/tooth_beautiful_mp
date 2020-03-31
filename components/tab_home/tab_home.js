var pageConfigs = {
  data: {
    tabInfo:[
      {
        name: "爱牙活动",
        url: "../../pages/tooth_acts/tooth_acts"
      },
      {
        name: "爱牙知识",
        url: "../../pages/tooth_knowledge/tooth_knowledge"
      },
      {
        name: "矫正案例",
        url: "../../pages/correction_case/correction_case"
      },
      {
        name: "矫正问答",
        url: "../../pages/correction_ask/correction_ask"
      },
    ]
  },
  properties: {
    curIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    toHome() {
      wx.switchTab({
        url: "../../pages/index/index"
      });
    }
  }
};
Component(pageConfigs);
