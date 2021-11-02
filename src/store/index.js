import { createStore } from 'vuex';

export default createStore({
  state: {
    showLayout: true,
    showSearch: false,
    userLoggedIn: false,
    accessToken: '',
    refreshToken: '',
  },
  mutations: {
    login(state) {
      state.userLoggedIn = true;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
    toggleLayoutShow(state, payload) {
      state.showLayout = payload;
    },
    toggleSearchShow(state) {
      state.showSearch = !state.showSearch;
    },
    getToken(state, payload) {
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
    },
  },
  actions: {
    toggleLayoutShow({ commit }, payload) {
      commit('toggleLayoutShow', payload);
    },
    login({ commit }, payload) {
      commit('getToken', payload);
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {
  },
});
