/**
 * Vuex 模块化启用 namespaced 后
 * 模块访问方式有些不适应，不习惯用"/"方式表示模块对象层次，如：
 *    getters['context/loginInfo']
 *    dispatch('context/setLoginUser', user)
 * 使用 storeHelper 模块将模块化后的 store 展开为对象属性方式访问
 * 提供三个对象：{ modules, getters, actions }
 * 调用模块的 getters/actions 访问 store, 如：
 *    storeHelper.modules.context.getters.loginUser
 *    storeHelper.modules.context.actions.setLoginUser(user)
 */
import store from '@/store'
import nothing from '@cbtak/nothing'
const { getters: storeGetters, _actions: storeActions } = store
const [gettersKeys, actionsKeys] = [Object.keys(storeGetters), Object.keys(storeActions)]

const storeHelper = {
  modules: (args) => nothing.isNotNull(args) ? JSON.getAttribute(storeHelper.modules, args.replaceAll('/', '.')) : storeHelper.modules,
  getters: (args) => nothing.isNotNull(args) ? JSON.getAttribute(storeHelper.getters, args.replaceAll('/', '.')) : storeHelper.getters,
  actions: (args) => nothing.isNotNull(args) ? JSON.getAttribute(storeHelper.actions, args.replaceAll('/', '.')) : storeHelper.actions
}
Object.assign(storeHelper.modules, {getters: {}, actions: {}})

gettersKeys.forEach(item => {
  if (item.contains('/')) {
    let {modules: _module, getters: _getters} = storeHelper
    let moduleKeys = item.split('/')
    moduleKeys.forEach((key, index) => {
      if (index === moduleKeys.length - 1) {
        _module = _module.getters = _module.getters || {}
        _module.__defineGetter__(key, () => storeGetters[item])
        _getters.__defineGetter__(key, () => storeGetters[item])
      } else {
        if (!nothing.hasOwnProperty(_module, key)) _module[key] = {}
        if (!nothing.hasOwnProperty(_getters, key)) _getters[key] = {}
        _module = _module[key]
        _getters = _getters[key]
      }
    })
  } else {
    storeHelper.modules.getters.__defineGetter__(item, () => storeGetters[item])
    storeHelper.getters.__defineGetter__(item, () => storeGetters[item])
  }
})

actionsKeys.forEach(item => {
  if (item.contains('/')) {
    let {modules: module, actions} = storeHelper
    let moduleKeys = item.split('/')
    moduleKeys.forEach((key, index) => {
      if (index === moduleKeys.length - 1) {
        module = module.actions = module.actions || {}
        module.__defineGetter__(key, () => storeActions[item][0])
        actions.__defineGetter__(key, () => storeActions[item][0])
      } else {
        if (!nothing.hasOwnProperty(module, key)) {
          module[key] = {}
        }
        if (!nothing.hasOwnProperty(actions, key)) {
          actions[key] = {}
        }
        module = module[key]
        actions = actions[key]
      }
    })
  } else {
    storeHelper.modules.actions.__defineGetter__(item, () => storeActions[item][0])
    storeHelper.actions.__defineGetter__(item, () => storeActions[item][0])
  }
})

export const { modules, getters, actions } = storeHelper
export default storeHelper
