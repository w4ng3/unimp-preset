// component/news_card/news_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: {
      type: String,
      value: ''
    },
    title: String,
    tags: {
      type: Array,
      value: []
    },
    date: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultCover: '//cdn.jsdelivr.net/gh/w4ng3/wiki-image@main/img/huaji.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      let myEventDetail = {
        key: e.target.dataset.info // 114514
      } // detail对象，提供给事件监听函数
      let myEventOption = {
        bubbles: false, // 事件是否冒泡
        composed: false, // 事件是否可以穿越组件边界
        capturePhase: false // 事件是否拥有捕获阶段
      } // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
