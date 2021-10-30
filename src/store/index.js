import { createStore } from 'vuex';

export default createStore({
  state: {
    showLayout: true,
    showSearch: false,
    userLoggedIn: false,
  },
  mutations: {
    login(state) {
      state.userLoggedIn = true;
    },
    toggleLayoutShow(state, payload) {
      state.showLayout = payload;
    },
    toggleSearchShow(state) {
      state.showSearch = !state.showSearch;
    },
  },
  actions: {
    toggleLayoutShow({ commit }, payload) {
      commit('toggleLayoutShow', payload);
    },
    // login({ commit }, payload) {
    //   console.log(payload);
    //   commit('login');
    // },
  },
  modules: {
  },
});
