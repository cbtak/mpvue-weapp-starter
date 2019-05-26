import BaseService from 'BaseService'

class OrderService extends BaseService {
  constructor () {
    super()
    console.log('OrderService - constructor')
  }
}

export default OrderService.newInstance()
