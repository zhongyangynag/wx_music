//app.js
App({
  globalInfo: {
    info: 'app info'
  },
  onLaunch: function () {
    console.log('app:', '初始化');
  },
  onShow: function (options) {
    console.log('app:', '进入前台', options);
  },
  onHide() {
    console.log('app:', '离开前台');
  }
})