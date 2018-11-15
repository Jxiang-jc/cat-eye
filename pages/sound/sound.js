// pages/sound/sound.js
const request = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    play_status: 'pause',
    current: 0, // 当前时间
    duration: 0, // 总时长
    minute: 0
  },
  getSoundDetail (id) {
    request({
      url: 'https://www.missevan.com/sound/getsound?soundid=' + id,
      success: (res) => {
        console.log(res)
        this.setData({
          info: res.info
        })
        this.createAudio('https://static.missevan.com/'+ res.info.sound.soundurl_64)
      }
    })
  },
  createAudio (src) {
    this.audio = wx.createInnerAudioContext()
    this.audio.src = src
    
    this.audio.onPlay(() => { // 必须要写这个才能ontimeUpdate生效
      console.log('开始播放')
      this.timeupdate()
    })

    this.audio.onSeeked(() => { // 音频完成跳转操作的事件
      // console.log('进度更改')
      this.timeupdate()
    })
  },

  playAndPause () {
    if (this.data.play_status === 'pause') { // 点击播放
      this.audio.play()
      this.setData({
        play_status: 'play'
      })
    } else { // 点击暂停
      this.audio.pause()
      this.setData({ play_status: 'pause' })
    } 
  },
  
  timeupdate () {
    this.audio.onTimeUpdate((res) => {
      console.log(this.audio)
      let seconds = Math.floor(this.audio.currentTime.toFixed(0))
      seconds = seconds < 10 ? '0' + seconds : seconds
      // console.log(this.audio.duration) 当前音频的长度 
      // console.log(this.audio.currentTime) 当前音频播放位置
      // let time =  Math.ceil(item.duration / 1000)
      this.setData({ 
        current: seconds
      })
    })
  },

  changeSlide (e) {
    var curval=e.detail.value //滑块拖动的当前值
    console.log(curval, this.audio.duration, this.audio.currentTime.toFixed(0))
    this.audio.seek(curval/100) //让滑块跳转至指定位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id || '203087'
    this.setData({
      duration: options.duration
    })
    this.getSoundDetail(id)
    
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