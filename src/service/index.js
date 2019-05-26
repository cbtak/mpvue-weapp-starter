/**
 * 将 src/service 目录下所有 Service 引入并统一导出
 * 后续在 AppContext 对象上将统一挂载到 AppContext.service 上
 *
 * 1. export 导出
 *    引入&调用示例：
 *    import { userService, orderService } from '@/service'
 *    userService.login(loginInfo)
 *    let orderList = orderService.getOrderList()
 *
 * 2. export default 导出
 *    调用示例：
 *    AppContext.service.user.login(loginInfo)
 */
// import nothing from '@cbtak/nothing'
import userService from './UserService'
import orderService from './OrderService'

class Services {
  user = userService
  order = orderService
}

export {
  userService,
  orderService
}

export default new Proxy(new Services(), {set () { return true }})
