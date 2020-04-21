// pages/play/play.js

const bgMusic = wx.getBackgroundAudioManager()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '00:00',   //总时长
    src: "",
    name:'name',
    arname:'',
    similar: false
  },

  playthis(e){
    let id = e.currentTarget.dataset.item
    console.log(id)
    var that = this
    wx.request({
      url: getApp().globalData.api+'/song/detail?ids=' + id,
      success: function (res) {
        console.log(res)
        bgMusic.title = res.data.songs[0].name
        that.setData({
          imgSrc: res.data.songs[0].al.picUrl,
          name: res.data.songs[0].name,
          arname: res.data.songs[0].ar[0].name,
          duration: res.data.songs[0].dt,
          condition: true
        })
      }
    })
    wx.request({
      url: getApp().globalData.api+'/song/url?id=' + id,
      success: function (res) {
        console.log(res)
        if (res.data.data[0].url) {
          that.setData({
            src: res.data.data[0].url
          })
          that.listenerButtonPlay()
        }

      }
    })
  },
  listenerButtonPlay: function () {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放
    // bgMusic.title = this.data.name
    bgMusic.epname = '此时此刻222'
    bgMusic.src = that.data.src;
    bgMusic.onTimeUpdate(() => {
      //bgMusic.duration总时长  bgMusic.currentTime当前进度
      // console.log(bgMusic.currentTime)
      var duration = bgMusic.duration;
      var offset = bgMusic.currentTime;
      var currentTime = parseInt(bgMusic.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(bgMusic.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */

      that.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true
      })
    })
    bgMusic.play();
    that.setData({
      isOpen: true,
    })
    //播放结束
    bgMusic.onEnded(() => {
      that.setData({
        starttime: '00:00',
        isOpen: false,
        offset: 0
      })
      console.log("音乐播放结束");
    })
  },
  //暂停播放
  listenerButtonPause() {
    var that = this
    bgMusic.pause()
    that.setData({
      isOpen: false,
    })
  },
  listenerButtonStop() {
    var that = this
    bgMusic.stop()
  },
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
    bgMusic.play();
    bgMusic.seek(offset);
    that.setData({
      isOpen: true,
    })
  },
  // 页面卸载时停止播放
  onUnload() {
    var that = this
    that.listenerButtonStop()//停止播放
    console.log("离开")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    let duration = options.duration
    var that = this
    wx.request({
      url: getApp().globalData.api+'/song/detail?ids='+id,
      success: function (res) {
        console.log(res)
        bgMusic.title = res.data.songs[0].name
        that.setData({
          imgSrc: res.data.songs[0].al.picUrl,
          name:res.data.songs[0].name,
          arname: res.data.songs[0].ar[0].name,
          duration: res.data.songs[0].dt,
          condition: true
        })
      }
    })
    wx.request({
      url: getApp().globalData.api+'/song/url?id='+id,
      success: function (res) {
        console.log(res)
        if (res.data.data[0].url){
            that.setData({
              src: res.data.data[0].url
            })
            that.listenerButtonPlay()
        }
       
      }
    })
    // 相似音乐
    wx.request({
      url: getApp().globalData.api+'/simi/song?id='+id,
      success: function (res) {
        if (res.data.songs){
           that.setData({
          simMusic: res.data.songs
        })
        }
        console.log(res)
        }
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isOpen: false,
      })
    })
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isOpen: true,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})