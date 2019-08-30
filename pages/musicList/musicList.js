// pages/musicList/musicList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      let id=options.id
    var that = this
    wx.request({
      url: 'http://148.70.214.132:3000/playlist/detail?id='+id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          list: res.data,
          ImgUrl: res.data.playlist.coverImgUrl,
          condition:true
          //res代表success函数的事件对，data是固定的，list是数组
        })
      }
    })
  },
  handleClick(e) {
    let id = e.currentTarget.dataset.item
    let duration = e.currentTarget.dataset.duration
    wx.navigateTo({
      url: '/pages/play/play?id=' + id + "&duration=" + duration
    });
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