import nothing from '@cbtak/nothing'
import store from '@/store'
import Enums from '@/common/Enums'

class BaseService {
  constructor () {
    console.log('BaseService')
  }
  /**
   * vuex Store 的 action 调用
   * @param {*} action 调用的action名
   * @param {*} params 参数
   */
  _dispatch = (action = '', params) => store.dispatch(action.replaceAll('.', '/'), params)
  /**
   * vuex Store 的 getters 引用
   * @param {*} getters Store中引用的getters属性名
   * @param {*} defaultValue 默认值（结果为空时）
   */
  _getters = (getters = '', defaultValue = null) => nothing.ifNull(store.getters[getters.replaceAll('.', '/')], defaultValue)
  /**
   * 基于Promise调用API
   * @param {*}
   */
  _callAPI = ({callFun = Function, callParams = [], callBack, resultType = Enums.DataType.JSON} = {}) => {
    return new Promise((resolve, reject) => {
      callFun(...callParams).then(({status, data, errorMsg}) => {
        if (status) {
          data = nothing.caseValue(
            resultType,
            Enums.DataType.JSON, nothing.ifNull(data, {}),
            Enums.DataType.ARRAY, nothing.ifNull(data, []),
            Enums.DataType.DATE, nothing.isNotNull(data) ? new Date(data) : null,
            Enums.DataType.STRING, nothing.ifNull(data, null),
            Enums.DataType.NUMBER, Number(nothing.ifNull(data, 0)),
            data
          )
          if (callBack) callBack(data)
          resolve(data)
        } else throw errorMsg || '执行 [' + callFun.name + '] 发生未知错误.'
      }).catch(err => reject(err))
    })
  }
  /**
   * 查询
   * @param {*}
   */
  _query = ({api, params, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 修改
   * @param {*}
   */
  _update = ({api, params, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 保存
   * @param {*}
   */
  _save = ({api, params, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 删除
   * @param {*}
   */
  _delete = ({api, params, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 调用动作
   * @param {*} params
   */
  _callAction = ({api, params, callBack, resultType = Enums.DataType.JSON, action = null} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 列表查询
   * @param {*} params
   */
  _queryList = ({api, params, callBack, resultType = Enums.DataType.ARRAY} = {}) => {
    return this._callAPI({callFun: api, callParams: [params], callBack, resultType})
  }
  /**
   * 分页查询
   * @param {*}
   */
  _queryPage = ({api, params, page, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params, page], callBack, resultType})
  }
  /**
   * 流式分页查询
   * @param {*}
   */
  _queryFlowPage = ({api, params, page, callBack, resultType = Enums.DataType.JSON} = {}) => {
    return this._callAPI({callFun: api, callParams: [params, page], callBack, resultType})
  }
  static newInstance () {
    return new Proxy(new this(), {
      set (target, key, value) {
        return true
      }
    })
  }
}

export default BaseService
