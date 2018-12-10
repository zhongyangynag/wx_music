//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    message: 'hello 小程序',
    nowClass: 'box',
    list: [1111, 2222, 33333],
    isShow: false,
    childInfo: '事件  ---  子容器',
    msgInfo: '来自父级的问候'
  },
  handleChange() {
    this.setData({
      message: 'new 小程序'
    });
  },
  handleToList() {
    /* wx.navigateTo({
      url : '/pages/list/list'
     });*/
    wx.reLaunch({
      url: '/pages/list/list'
    });
  },
  onLoad: function () {
    console.log(this.route);
  },
  onReachBottom: function () {
    console.log('已经到底了，可以添加新的数据了');
  },
  onShareAppMessage: function () {

  },
  handleToEvent(ev) {
    console.log(ev.target.id);
    //console.log( ev.currentTarget );
    if (ev.currentTarget.id === 'child') {
      this.setData({
        childInfo: '子容器  ---  事件'
      });
    }
  },
  getHeaderInfo(ev) {
    console.log(ev.detail);
  },
  showNumber() {
    return 1234;
  }
})
