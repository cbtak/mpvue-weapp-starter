import Vue from 'vue'
import App from './App'
import store from './store'
import VuexHelper from '@cbtak/vuex-helper'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
  async created () {
    // 将 VuexHelper 实例挂载到全局 Vue 实例上
    this.__defineGetter__('$storeHelper', () => new VuexHelper(this.$store))
    // 将 Vue 全局实例挂载到 wx.$app 上
    wx.__defineGetter__('$app', () => this)
    // 将 全局 AppContext 实例挂载到 wx.AppContext 上
    let { default: context } = require('./common/AppContext')
    wx.__defineGetter__('AppContext', () => context)
  },
  /**
   * 微信小程序生命周期钩子：
   * @param {*} options
   */
  onLaunch (options) {
    console.warn('@@@ App onLaunch', this)
  },
  /**
   * 微信小程序生命周期钩子：
   * @param {*} options
   */
  onShow (options) {
    console.warn('@@@ App onShow', this)
  },
  /**
   * 微信小程序生命周期钩子：
   */
  onHide () {
    console.warn('@@@ App onHide', this)
  },
  /**
   * 微信小程序生命周期钩子：
   * @param {*} msg
   */
  onError (msg) {
    console.error('@@@ App onError', this, msg)
  }
})
app.$mount()
