// pages/index/components/index-top-group/index-top-group.js
var request = require('../../../../utils/request')
Component({

  /**
   * 组件的初始数据
   */
  data: {
    datas: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDatas () {
      //https://www.missevan.com/mobileWeb/newHomepage3
      request({
        url: 'https://www.missevan.com/mobileWeb/newHomepage3',
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: (res) => {
          console.log(res)
          this.setData({ datas: res.info })
        }
      })
    }
  },
  ready () {
    this.getDatas()
  }
})