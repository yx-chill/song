import { createStore } from 'vuex';

export default createStore({
  state: {
    userLoggedIn: false,
  },
  mutations: {
    login(state) {
      state.userLoggedIn = true;
    },
  },
  actions: {
    // login({ commit }, payload) {
    //   console.log(payload);
    //   commit('login');
    // },
  },
  modules: {
  },
});
