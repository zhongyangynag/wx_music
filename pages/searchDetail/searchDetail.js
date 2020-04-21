// pages/searchDetail/searchDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    value:'',
    song:true,
    singer:false,
    video:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let value = options.value
    this.setData({
      value: value,
    })
    var that = this
    wx.request({
      url: getApp().globalData.api+'/search?keywords='+value,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.result)
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          list: res.data.result,
        })
      }
    })
  },
  handleClick(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item
    let duration = e.currentTarget.dataset.duration
    wx.navigateTo({
      url: '/pages/play/play?id='+id+"&duration="+duration
    });
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    var that=this
    wx.request({
      url: getApp().globalData.api+'/search?keywords=' + this.data.value + '&type=' + detail.key +'&limit=21&offset=0',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.result,
        })
        console.log(res)
        if (detail.key==='1'){
          that.setData({
            song:true,
            singer:false,
            video:false
          });
          }
        if (detail.key === '100') {
          that.setData({
            song: false,
            singer: true,
            video: false
          });
        }
        if (detail.key === '1014') {
          that.setData({
            song: false,
            singer: false,
            video: true
          });
        }
        //将获取到的json数据，存在名字叫list的这个数组中
       
      }
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