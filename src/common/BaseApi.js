import { request } from '@/utils/request'
import nothing from '@cbtak/nothing'
import Enums from '@/common/Enums'
import Qs from 'qs'

/**
 * ajax请求
 * @param {*}
 */
export const _request = ({
  url,
  params = {},
  method = 'post',
  token = false,
  contentType = Enums.ContentType.JSON_UTF8,
  headers = {}
} = {}) => request(url, nothing.caseValue(contentType, Enums.ContentType.FORM_UTF8, Qs.stringify(params), params), {
  method: method,
  _token: token,
  headers: Object.assign(headers, {'Content-Type': contentType})
})

/**
 * GET请求
 * @param {*}
 */
export const _get = ({
  url,
  params = {},
  method = 'get',
  token = false,
  contentType = Enums.ContentType.FORM_UTF8,
  headers = {}
} = {}) => _request({url, params, method, token, contentType, headers})

/**
 * POST请求
 * @param {*}
 */
export const _post = ({
  url,
  params = {},
  method = 'post',
  token = false,
  contentType = Enums.ContentType.JSON_UTF8,
  headers = {}
} = {}) => _request({url, params, method, token, contentType, headers})

/**
 * 分页查询
 * @param {*}
 */
export const _queryPage = ({
  url,
  params = {},
  page = {},
  method = 'post',
  token = false,
  contentType = Enums.ContentType.JSON_UTF8
} = {}) => _post({
  url,
  params,
  method,
  token,
  contentType,
  headers: {
    'pageNo': page.pageNo,
    'pageSize': page.pageSize
  }
})

/**
 * 流式分页查询
 * @param {*}
 */
export const _queryFlowPage = ({
  url,
  params = {},
  page = {},
  method = 'post',
  token = false,
  contentType = Enums.ContentType.JSON_UTF8
} = {}) => _post({
  url,
  params,
  method,
  token,
  contentType,
  headers: {
    'beginTime': page.beginTime,
    'direction': page.direction,
    'orderBy': page.orderBy,
    'pageSize': page.pageSize
  }
})
