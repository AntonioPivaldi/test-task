import { createStore } from 'vuex';
import query from './queries/query'

const store = createStore({
  actions: {},
  mutations: {
    setUser(state, login) {
      state.userLogin = login;
    }
  },
  state() {
    return {
      userLogin: 'octocat',
      query: query,
    }
  },
  getters: {
    getUser(state) {
      return state.userLogin;
    },
    getQuery(state) {
      return state.query;
    },
  },
})

export default store;