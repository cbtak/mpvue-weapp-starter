/**
 * 小程序页面初始化
 * @param {*} page
 */
const initPage = (page = {}, Vue) => {
  // add this to handle exception
  Vue.config.errorHandler = function (err) {
    if (console && console.error) {
      console.error(err)
    }
  }
  const _hooks = {}
  const vueHookNames = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed', 'errorCaptured']
  const weappHookNames = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload']
  const weappEvents = ['onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap']
  const hookNames = [].concat(vueHookNames, weappHookNames, weappEvents)
  hookNames.forEach(hooksName => {
    _hooks[hooksName] = page[hooksName] || (() => {})
    delete page[hooksName]
  })
  return Object.assign(page, {
    /**
     * Vue 生命周期钩子：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     */
    beforeCreate () {
      (Array.isArray(_hooks.beforeCreate) ? _hooks.beforeCreate[0] : _hooks.beforeCreate).apply(this)
    },
    /**
     * Vue 生命周期钩子：在实例创建完成后被立即调用
     */
    created () {
      // 将页面Vue实例添加到store中
      wx.AppContext.$storeHelper.modules.context.actions.addPageApp(this)
      _hooks.created.apply(this)
    },
    /**
     * Vue 生命周期钩子：在挂载开始之前被调用：相关的 render 函数首次被调用
     */
    beforeMount () {
      _hooks.beforeMount.apply(this)
    },
    /**
     * Vue 生命周期钩子：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
     */
    mounted () {
      _hooks.mounted.apply(this)
    },
    /**
     * Vue 生命周期钩子：数据更新时调用，发生在虚拟 DOM 打补丁之前
     */
    beforeUpdate () {
      _hooks.beforeUpdate.apply(this)
    },
    /**
     * Vue 生命周期钩子：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
     */
    updated () {
      _hooks.updated.apply(this)
    },
    /**
     * Vue 生命周期钩子：keep-alive 组件激活时调用
     */
    activated () {
      _hooks.activated.apply(this)
    },
    /**
     * Vue 生命周期钩子：keep-alive 组件停用时调用
     */
    deactivated () {
      _hooks.deactivated.apply(this)
    },
    /**
     * Vue 生命周期钩子：实例销毁之前调用。在这一步，实例仍然完全可用
     */
    beforeDestroy () {
      _hooks.beforeDestroy.apply(this)
    },
    /**
     * Vue 生命周期钩子：Vue 实例销毁后调用
     */
    destroyed () {
      _hooks.destroyed.apply(this)
    },
    /**
     * Vue 生命周期钩子：当捕获一个来自子孙组件的错误时被调用
     */
    errorCaptured (err, vm, info) {
      _hooks.errorCaptured.call(this, err, vm, info)
    },
    /**
     * 小程序页面生命周期钩子：监听页面加载
     * @param {*} options
     */
    onLoad (options) {
      _hooks.onLoad.call(this, options)
    },
    /**
     * 小程序页面生命周期钩子：监听页面显示
     */
    onShow () {
      // 挂载当前页面Vue实例到wx对象的属性：$pageApp
      // wx.__defineGetter__('$pageApp', () => this)
      _hooks.onShow.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面初次渲染完成
     */
    onReady () {
      _hooks.onReady.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面隐藏
     */
    onHide () {
      _hooks.onHide.apply(this)
    },
    /**
     * 小程序页面生命周期钩子：监听页面卸载
     */
    onUnload () {
      _hooks.onUnload.apply(this)
    },
    /**
     * 小程序页面事件处理：监听用户下拉动作
     */
    onPullDownRefresh () {
      _hooks.onPullDownRefresh.apply(this)
    },
    /**
     * 小程序页面事件处理：页面上拉触底事件的处理函数
     */
    onReachBottom () {
      _hooks.onReachBottom.apply(this)
    },
    /**
     * 小程序页面事件处理：用户点击右上角转发
     * @param {*} object
     */
    onShareAppMessage (object) {
      _hooks.onShareAppMessage.call(this, object)
    },
    /**
     * 小程序页面事件处理：页面滚动触发事件的处理函数
     * @param {*} object
     */
    onPageScroll (object) {
      _hooks.onPageScroll.call(this, object)
    },
    /**
     * 小程序页面事件处理：页面尺寸改变时触发
     * @param {*} object
     */
    onResize (object) {
      _hooks.onResize.call(this, object)
    },
    /**
     * 小程序页面事件处理：当前是 tab 页时，点击 tab 时触发
     * @param {*} tabItem
     */
    onTabItemTap (tabItem) {
      _hooks.onTabItemTap.call(this, tabItem)
    }
  })
}

export {
  initPage
}

export default { init: initPage }
