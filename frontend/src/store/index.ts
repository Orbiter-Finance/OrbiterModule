import { createStore } from 'vuex'

export default createStore({
  state: {
    s3Proof: '',
  },
  mutations: {
    setS3Proof(state, s3Proof) {
      state.s3Proof = s3Proof
    }
  },
  actions: {
  },
  modules: {
  }
})
