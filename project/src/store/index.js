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

/* Hey there. I really really don't understand why 
I must use VueX storage here. It's simple and small
"app", no need of VueX, I guess. 

If you are reading this, please, give me a feedback 
about this work, I will appreciate it.

- Email: 9212565@gmail.com;

- Discord: https://discordapp.com/users/635529058423275563;

Thank you, have a noice day. */