//index.js
//获取应用实例
const app = getApp()
const request = require('../../utils/request')

Page({
  data: {
    music:[]
  },
  getMusic () {
    request({
      url: 'https://www.missevan.com/sound/newhomepagedata',
      success: (res) => {
        console.log(123, res)
        this.setData({
          music: res.music
        })
      }
    })
  },
  onLoad: function () {
    // 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
    this.getMusic()
  }
})
