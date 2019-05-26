import stringRandom from 'string-random'
import Enums from '@/common/Enums'
import nothing from '@cbtak/nothing'

const idGen = (options = {}) => {
  let id = stringRandom(nothing.ifNull(options.length, 8), options)
  return nothing.caseValue((options && options.style), Enums.StringStyle.UPPER, id.toUpperCase(), Enums.StringStyle.LOWER, id.toLowerCase(), id)
}
idGen.gen32 = (options) => idGen(Object.assign({length: 32}, options))
idGen.gen64 = (options) => idGen(Object.assign({length: 64}, options))

export default idGen
