const context = {
  namespaced: true, // 启用模块命名空间

  state: {
    pageApps: {}  //  页面的Vue实例集，以页面的路由地址作为key
  },

  getters: {
    pageApps: state => state.pageApps
  },

  mutations: {
    SET_PAGE_APPS: (state, pageApps) => {
      state.pageApps = pageApps || {}
    },
    ADD_PAGE_APP: (state, pageApp) => {
      state.pageApps[pageApp.$options.__file.replace('src/', '').replace('/index.vue', '/main')] = pageApp
    },
    DELETE_PAGE_APP: (state, pageApp) => {
      delete state.pageApps[pageApp.$options.__file.replace('src/', '').replace('/index.vue', '/main')]
    }
  },

  actions: {
    setPageApps: ({ commit }, pageApps) => {
      commit('SET_PAGE_APPS', pageApps)
    },
    addPageApp: ({ commit }, pageApp) => {
      commit('ADD_PAGE_APP', pageApp)
    },
    deletePageApp: ({ commit }, pageApp) => {
      commit('DELETE_PAGE_APP', pageApp)
    }
  }
}

export default context
