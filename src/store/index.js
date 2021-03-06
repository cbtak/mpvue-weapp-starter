import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    ...modules
  },
  strict: debug   // 开启严格模式
})

export default store
