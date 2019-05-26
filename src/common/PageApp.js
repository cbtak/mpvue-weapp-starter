import Vue from 'vue'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

/**
 * 小程序页面初始化
 * @param {*} page
 */
const initPage = (page = {}) => {
  // 混入方式：1
  // Vue.mixin(page)
  // const app = new Vue({
  //   onShow () {
  //     // 挂载当前页面Vue实例到wx对象的属性：$pageApp
  //     wx.__defineGetter__('$pageApp', () => this)
  //   }
  // })
  // 混入方式：2
  // const app = new Vue({
  //   mixins: [page],  // 该混入方式会执行两次小程序生命周期，此处不建议使用
  //   ...page,
  //   onShow () {
  //     wx.__defineGetter__('$pageApp', () => this)
  //   }
  // })
  // mpvue 使用混入后，会造成小程序生命周期函数调用不可控，会出现多次调用，不推荐使用，使用以下方式：
  const app = new Vue({
    ...page,
    /**
     * Vue 生命周期钩子：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate () {
      if (page.beforeCreate && page.beforeCreate.length) page.beforeCreate[0].apply(this)
    },
    /**
     * Vue 生命周期钩子：在实例创建完成后被立即调用
     */
    created () {
      if (page.created) page.created.apply(this)
    },
    /**
     * Vue 生命周期钩子：在挂载开始之前被调用：相关的 render 函数首次被调用
     */
    beforeMount () {
      if (page.beforeMount) page.beforeMount.apply(this)
    },
    /**
     * Vue 生命周期钩子：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     */
    mounted () {
      if (page.mounted) page.mounted.apply(this)
    },
    /**
     * Vue 生命周期钩子：数据更新时调用，发生在虚拟 DOM 打补丁之前
     */
    beforeUpdate () {
      if (page.beforeUpdate) page.beforeUpdate.apply(this)
    },
    /**
     * Vue 生命周期钩子：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
     */
    updated () {
      if (page.updated) page.updated.apply(this)
    },
    /**
     * Vue 生命周期钩子：keep-alive 组件激活时调用
     */
    activated () {
      if (page.activated) page.activated.apply(this)
    },
    /**
     * Vue 生命周期钩子：keep-alive 组件停用时调用
     */
    deactivated () {
      if (page.deactivated) page.deactivated.apply(this)
    },
    /**
     * Vue 生命周期钩子：实例销毁之前调用。在这一步，实例仍然完全可用
     */
    beforeDestroy () {
      if (page.beforeDestroy) page.beforeDestroy.apply(this)
    },
    /**
     * Vue 生命周期钩子：Vue 实例销毁后调用
     */
    destroyed () {
      if (page.destroyed) page.destroyed.apply(this)
    },
    /**
     * Vue 生命周期钩子：当捕获一个来自子孙组件的错误时被调用
     */
    errorCaptured (err, vm, info) {
      if (page.errorCaptured) page.errorCaptured.call(this, err, vm, info)
    },
    /**
     * 小程序页面生命周期钩子：监听页面加载
     * @param {*} options
     */
    onLoad (options) {
      if (page.onLoad) page.onLoad.call(this, options)
    },
    /**
     * 小程序页面生命周期钩子：监听页面显示
     */
    onShow () {
      // 挂载当前页面Vue实例到wx对象的属性：$pageApp
      wx.__defineGetter__('$pageApp', () => this)
      if (page.onShow) page.onShow.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面初次渲染完成
     */
    onReady () {
      if (page.onReady) page.onReady.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面隐藏
     */
    onHide () {
      if (page.onHide) page.onHide.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面卸载
     */
    onUnload () {
      if (page.onUnload) page.onUnload.apply(this)
    },
    /**
     * 小程序页面事件处理：监听用户下拉动作
     */
    onPullDownRefresh () {
      if (page.onPullDownRefresh) page.onPullDownRefresh.apply(this)
    },
    /**
     * 小程序页面事件处理：页面上拉触底事件的处理函数
     */
    onReachBottom () {
      if (page.onReachBottom) page.onReachBottom.apply(this)
    },
    /**
     * 小程序页面事件处理：用户点击右上角转发
     * @param {*} object
     */
    onShareAppMessage (object) {
      if (page.onShareAppMessage) page.onShareAppMessage.call(this, object)
    },
    /**
     * 小程序页面事件处理：页面滚动触发事件的处理函数
     * @param {*} object
     */
    onPageScroll (object) {
      if (page.onPageScroll) page.onPageScroll.call(this, object)
    },
    /**
     * 小程序页面事件处理：页面尺寸改变时触发
     * @param {*} object
     */
    onResize (object) {
      if (page.onResize) page.onResize.call(this, object)
    },
    /**
     * 小程序页面事件处理：当前是 tab 页时，点击 tab 时触发
     * @param {*} tabItem
     */
    onTabItemTap (tabItem) {
      if (page.onTabItemTap) page.onTabItemTap.call(this, tabItem)
    }
  })
  app.$mount()
  return app
}
export {
  initPage
}
export default { init: initPage }
