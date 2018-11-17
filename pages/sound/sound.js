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
    duration: 0, //silder参数，最大值
    currentTime: '0:00',
    timeLength: 0 // 总时长
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
  // 创建音乐播放器
  createAudio (src) {
    this.audio = wx.createInnerAudioContext()
    this.audio.src = src
    
    this.audio.onPlay(() => { // 必须要写这个才能ontimeUpdate生效
      console.log('开始播放')
      this.timeupdate()
    })

    this.audio.onSeeked(() => { // 音频完成跳转操作的事件
      console.log('进度更改')
      this.setData({ 
        current: this.audio.currentTime.toFixed(2) *100
      })
    })
  },
  // 更新时间以及进度条  
  timeupdate () {
    this.audio.onTimeUpdate((res) => {
      
      var per = this.audio.currentTime.toFixed(0)//获取当前播放时间所对应的s
      
      this.setData({ 
        currentTime: this._formatTime(per),
        duration: this.audio.duration.toFixed(2) *100 ,
        current: per*100
      })
      // console.log(this.audio.duration) 当前音频的长度 
      // console.log(this.audio.currentTime) 当前音频播放位置
    })
  },
  // 秒转换分钟
  _formatTime: function (interval) {
    interval = interval | 0
    const minute = interval / 60 | 0 
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  },
  /*秒前边加0*/
  _pad(num, n = 2) {
    let len = num.toString().length

    while (len < n) {
      num = '0' + num
      len++
    }
    return num
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

  changeSlide (e) {
    var curval=e.detail.value //滑块拖动的当前值
    console.log(e)

    // console.log(curval, this.audio.duration, this.audio.currentTime.toFixed(0))

    this.audio.seek(curval/100) //让滑块跳转至指定位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id || '203087'
    
    this.setData({
      timeLength: options.duration
    })

    this.getSoundDetail(id)
  }

})