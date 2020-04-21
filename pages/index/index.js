//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nowClass: 'box',
    isShow: false,
    value: '',
    username:'17782149108',
    password:'hc123456',
    list:[],
    newlist:[]
  },     
  onLoad: function () {
    var that = this
    // 热门歌曲
    wx.request({
      url: getApp().globalData.api+'/top/playlist?limit=12&order=hot',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            // console.log(res)
          that.setData({
            list: res.data.playlists
          })
        }
    })
    // 新歌速递
    wx.request({
      url: getApp().globalData.api+'/personalized/newsong',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          newlist: res.data.result.splice(0,4)
        })
      }
    }),
      // 榜单
      wx.request({
      url: getApp().globalData.api+'/toplist',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res)
          that.setData({

          })
        }
      })
  },
  playthis(e) {
    let id = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/play/play?id=' + id 
    });
  },
  onReachBottom: function () {
    console.log('已经到底了，可以添加新的数据了');
  },
  onShareAppMessage: function () {

  },
  input: function (e) {
    this.setData({
      value: e.detail.detail.value
    })
    console.log(value)
  },
  inputname: function (e) {
    console.log(e)
    this.setData({
      username: e.detail.detail.value
    })
  },
  inputpassword: function (e) {
    this.setData({
      password: e.detail.detail.value
    })
  },
  search(e) {
    let value = this.data.value
    if(value){
          wx.navigateTo({
            url: '/pages/searchDetail/searchDetail?value='+value,
      })
    }
 
  },
  handleClick(e){
    let id = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/musicList/musicList?id='+id,
    })
    console.log(e.currentTarget.dataset.item)
  },

})
