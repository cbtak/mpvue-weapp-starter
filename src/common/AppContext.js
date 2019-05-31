import Enums from './Enums'
import utils from '../utils'
import service from '../service'
import nothing from '@cbtak/nothing'
import Env from './Env'

// 全局Vue实例，wx.$app
const {$app, $app: {$store, $storeHelper}} = global.mpvue
const _getPage = () => getCurrentPages()[getCurrentPages().length - 1]
// 页面级Vue实例，由页面初始化时绑定当前页面vue实例
const _getPageApp = () => $storeHelper.modules.context.getters.pageApps[_getPage().route] // wx.$pageApp

/**
 * 页面上下文对象
 */
const pageContext = {}
nothing.defineGetter(pageContext, [
  {name: '$app', value: () => _getPageApp()},
  {name: '$page', value: () => _getPage()}
])

/**
 * 全局 AppContext
 */
const AppContext = {}
const _contextGetters = [
  {name: '$env', value: Env},
  {name: '$enums', value: Enums},
  {name: '$app', value: $app},
  {name: '$store', value: $store},
  {name: '$storeHelper', value: $storeHelper},
  {name: 'pageContext', value: pageContext},
  {name: 'utils', value: utils},
  {name: 'nothing', value: nothing},
  {name: 'service', value: service}
]
nothing.defineGetter(AppContext, _contextGetters)

export {
  Env as $env,
  Enums as $enums,
  $app,
  $store,
  $storeHelper,
  pageContext,
  utils,
  nothing,
  service
}

export default AppContext
