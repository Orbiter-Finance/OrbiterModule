import { createStore } from 'vuex'

export default createStore({
  state: {
    githubAccessToken: '',
  },
  mutations: {
    setAccessToken(state, token) {
      state.githubAccessToken = token
    }
  },
  actions: {
  },
  modules: {
  }
})
