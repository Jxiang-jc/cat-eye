// commons/components/common-content/common-content.js

const config = require('../../../utils/config')

Component({

  data:{
    type_info: {}
  },
  properties: {
    items: Array,
    type: String
  },
  attached () {
    this.setData({
      type_info: config.types[this.data.type]
      
    })
    // console.log(this)
  }
})