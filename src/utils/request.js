import Fly from 'flyio'
import store from '@/store'
import nothing from '@cbtak/nothing'
import Env from '@/common/Env'

const request = Env.isMiniProgram() ? new Fly() : Fly

const _loading = {
  show: () => {
    if (Env.isMiniProgram()) wx.showNavigationBarLoading()
  },
  hide: () => {
    if (Env.isMiniProgram()) wx.hideNavigationBarLoading()
  }
}

const _checkStatus = {
  401: () => {
    if (Env.isMiniProgram()) {
      wx.showModal({
        content: '登陆会话已过期，确认后返回登录页面！',
        showCancel: false,
        success: (res) => {
          wx.$vm.$router.replace({
            path: '/pages/login/index'
          })
        }
      })
    }
  }
}

/**
 * 请求拦截
 */
request.interceptors.request.use((config, promise) => {
  // 显示加载效果
  _loading.show()
  // 给所有请求添加自定义header
  // config.headers['X-Tag'] = 'flyio'
  // 超时设置
  config.timeout = 15000
  // 从环境变量中取 BASE_API
  config.baseURL = process.env.BASE_API
  // JSON格式化，未指定时，默认true
  config.parseJson = nothing.isNotNull(config.parseJson) ? config.parseJson : true
  // 如指定_auth == true，URL则跟上当前登录用户的sessionid
  // if (config._auth) {
  //   config.url = config.url + ';JSESSIONID=' + store.getters.wxAppUser.sysUser.sessionid
  // }
  // 如指定_token == true，则在headers中跟上相关token信息
  if (config._token) {
    config.headers['wxtoken'] = store.getters.wxAppUser.token // 登录会话ID
    config.headers['wxopenid'] = store.getters.wxAppUser.openid // 微信用户OPENID
    config.headers['wxappid'] = store.getters.wxAppUser.appid // 小程序号APPID
    config.headers['userid'] = store.getters.sysUser.id // 用户ID
    config.headers['usertype'] = store.getters.wxAppUser.userType // 用户类型
  }
  console.warn('####### API Request: ', config)
  return config
})

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response, promise) => {
    // 隐藏加载效果
    _loading.hide()
    let data = response.data || {status: false, errorMsg: '服务器未响应结果'}
    console.warn('####### API Response: ', data)
    return promise.resolve(data)
  },
  (error, promise) => {
    // 隐藏加载效果
    _loading.hide()
    let errorMsg = nothing.caseValue(error.status, 0, '网络连接异常', 1, '网络连接超时', 401, '请求服务未授权')
    console.error('####### API Response error: ', error)
    if (error.status === 401) {
      _checkStatus[error.status]()
    } else {
      return promise.reject(errorMsg)
    }
  }
)

export default request
