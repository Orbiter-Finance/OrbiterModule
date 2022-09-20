import { createStore } from 'vuex'

export default createStore({
  state: {
    account: '',
    isMaker: false
  },
  mutations: {
    setAccount(state, data) {
      state.account = data;
    },
    setMaker(state, data) {
      state.isMaker = data
    }
  },
  actions: {
  },
  modules: {
  }
})
