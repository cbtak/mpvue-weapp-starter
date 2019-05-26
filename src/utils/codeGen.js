// import stringRandom from 'string-random'
import numberRandom from 'number-random'

const genCode = {
  /**
   * 创建订单编码
   */
  genOrderCode: () => ('CR' + new Date().format('yyMMddHHmmss')).toUpperCase() + numberRandom(1000, 9999),
  genSalePlanCode: () => ('SP' + new Date().format('yyMMddHHmmss')).toUpperCase() + numberRandom(1000, 9999),
  genWrokReportCode: () => ('WRT' + new Date().format('yyMMddHHmmss')).toUpperCase() + numberRandom(1000, 9999),
  genStoreoutCode: () => ('XC' + new Date().format('yyMMddHHmmss')).toUpperCase() + numberRandom(1000, 9999)
}

export default genCode
