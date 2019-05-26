import nothing from '@cbtak/nothing'

/**
 * 公共环境信息
 */
const Env = {}
const _envGetters = [
  {name: 'loginInfo', value: () => wx.$app.$storeHelper.getters.context.loginInfo},
  {name: 'loginUser', value: () => wx.$app.$storeHelper.getters.context.loginUser},
  {name: 'isMiniProgram', value: typeof wx !== 'undefined' && wx.login !== null}
]
nothing.defineGetter(Env, _envGetters)

export default Env
