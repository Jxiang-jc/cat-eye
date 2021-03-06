// pages/rank/rank.js
const request = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },
  getInfo () {
    // https://www.missevan.com/mobileWeb/albumList
    request({
      url: 'https://www.missevan.com/mobileWeb/albumList',
      success: (res) => {
        console.log( res )
        this.setData({
          info: res.info
        })
      }
    })
  },
  toAlbumList (e) { // 跳转到音乐列表
    let id = e.currentTarget.dataset.id
    let url = '../album-list/album-list?id=' + id
    // console.log(url, id)
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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