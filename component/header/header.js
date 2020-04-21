Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    message: 'hello my-header',
    childMessage: '来自子组件的问候'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange() {
      /*this.setData({
        message : 'change my-header',
        msg : 'aaaaaaa'
      });*/

      //console.log( this.data.childMessage );
      //console.log( this.data.msg );   // this.properties.msg

      this.triggerEvent('customEvent', this.data.childMessage);

    }
  }
})
