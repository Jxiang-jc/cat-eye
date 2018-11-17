const request = ({url, data, success, fail, toast = true}) => {
    if (toast) {
        wx.showLoading({title: '请稍等....'})
    }
    wx.request({
        url, //仅为示例，并非真实的接口地址
        data,
        header: {
            'content-type': 'application/json', // 默认值
            'OI-APPKEY':'b2fc67038bd1e30caf14850e926fb817'
        },
        success: function (res) {
            if ( res.data.status === 'fail') {
                wx.showToast({
                    title: '没有请求到数据',
                    icon: 'none',
                    duration: 2000
                })
                
            } else {
                success(res.data)
            }
        },
        fail: function (error) {
            // 弹出请求失败
            wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 2000
              })
              fail(error)
        },
        complete: () => {
            if ( toast ) {// 弹出toast-loading
                wx.hideLoading()
            }
        }
    })
}

module.exports = request
