import stringRandom from 'string-random'
import numberRandom from 'number-random'
import Enums from '@/common/Enums'

const genID = {
  gen32: ({style = null} = {}) => wx.nothing.caseValue(
    style,
    Enums.StringStyle.UPPER, genID.getString(32).toUpperCase(),
    Enums.StringStyle.LOWER, genID.getString(32).toLowerCase(),
    genID.getString(32)
  ),
  gen64: ({style = null} = {}) => wx.nothing.caseValue(
    style,
    Enums.StringStyle.UPPER, genID.getString(64).toUpperCase(),
    Enums.StringStyle.LOWER, genID.getString(64).toLowerCase(),
    genID.getString(64)
  ),
  getString: (length, options) => wx.nothing.isNotNull(length) ? stringRandom(length, options) : stringRandom(),
  getNumber: (min, max, float) => numberRandom(min, max, float)
}
export default genID
