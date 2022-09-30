import { createStore } from 'vuex'

export default createStore({
  state: {
    account: '',
    isMaker: false,
    maker: ''
  },
  mutations: {
    setAccount(state, data) {
      state.account = data;
    },
    setIsMaker(state, data) {
      state.isMaker = data
    },
    setMaker(state, data) {
      state.maker = data
    }
  },
  actions: {
  },
  modules: {
  }
})
