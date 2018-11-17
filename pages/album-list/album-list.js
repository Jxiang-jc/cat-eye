// pages/album-list/album-list.js

const request = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },
  toSoundDetail (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let duration = e.currentTarget.dataset.duration
    wx.navigateTo({
      url: `../sound/sound?id=${id}&duration=${duration}`
    })
  },
  getInfo (id) {
    request({
      url:'https://www.missevan.com/sound/soundalllist?albumid='+ id,
      success: (res) => {
        
        res.info.sounds = res.info.sounds.map(item => {
          let time = Math.ceil(item.duration / 1000)
          let minutes = Math.floor(time / 60)
          let seconds = time % 60
          seconds = seconds < 10 ? '0' + seconds : seconds
          item.format_duration = minutes + ':' + seconds
          return item
        })
        this.setData({
          info: res.info
        })
        // console.log(222, res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) 小程序已经自动帮我们获取问号后面的参数
    let id = options.id
    this.getInfo(id)
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