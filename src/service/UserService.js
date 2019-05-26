import BaseService from 'BaseService'

class UserService extends BaseService {
  constructor () {
    super()
    console.log('UserService - constructor')
  }
  say = () => 'hello 1 !'
  say2 = () => 'hello 2 !'
  queryUser = () => this._query()
}

export default UserService.newInstance()
