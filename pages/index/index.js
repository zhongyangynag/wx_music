//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nowClass: 'box',
    isShow: false,
    value: '芒种',
    username:'17782149108',
    password:'hc123456'
  },
  onLoad: function () {
    var that = this
    // /recommend/songs
        wx.request({
          url: 'http://148.70.214.132:3000/top/playlist?limit=21&order=hot',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res)
              that.setData({
                list: res.data.playlists
              })
            }
        })
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
  // login(e){
  //   let username = this.data.username
  //   let password = this.data.password
  //   console.log(username,password)
  //   // http://localhost:3000/
  //   wx.request({
  //     url: 'http://localhost:3000/login/cellphone?phone=' + username + '&password=' + password,
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           success: function (res) {
  //               console.log(res)
  //           }
  //       })
  // },
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
