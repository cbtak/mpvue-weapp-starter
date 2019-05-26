/**
 * 字符串样式
 */
const StringStyle = {
  UPPER: 'UPPER', // 大写
  LOWER: 'LOWER'  // 小写
}

/**
 * 数据方向
 */
const DataDirection = {
  REACH_BOTTOM: 'ReachBottom',
  PULL_DOWN: 'PullDown'
}

/**
 * 数据排序
 */
const OrderBy = {
  ASC: 'ASC',
  DESC: 'DESC'
}

/**
 * 编辑类型
 */
const EditType = {
  ADD: 'ADD',       // 新增
  COPY: 'COPY',     // 拷贝(新增)
  UPDATE: 'UPDATE'  // 修改
}

/**
 * 数据类型
 */
const DataType = {
  JSON: JSON,
  ARRAY: Array,
  DATE: Date,
  STRING: String,
  NUMBER: Number,
  BOOLEAN: Boolean
}

/**
 * HTTP请求Header类型
 */
const ContentType = {
  FORM: 'application/x-www-form-urlencoded',
  FORM_UTF8: 'application/x-www-form-urlencoded;charset=utf-8',
  JSON: 'application/json',
  JSON_UTF8: 'application/json;charset=utf-8',
  MULTIPART_FORM: 'mutipart/form-data'
}

/**
 * 公共值变量
 */
const CommonVariable = {
  TRUE: true,
  FALSE: false,
  STR_TRUE: '1',
  STR_FALSE: '0',
  N_TRUE: 1,
  N_FALSE: 0,
  YES: 1,
  NO: 0,
  STR_YES: '1',
  STR_NO: '0',
  ZERO: 0,
  NULL: null,
  UNDEFINED: undefined,
  NULL_STRING: ''
}

export default {
  StringStyle,
  DataDirection,
  OrderBy,
  EditType,
  DataType,
  ContentType,
  ...CommonVariable
}
