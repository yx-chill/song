import { createStore } from 'vuex';

export default createStore({
  state: {
    showLayout: true,
    showSearch: false,
    adminLoggedIn: false,
    adminToken: '',
    adminRefreshToken: '',
    genres: '',
  },
  mutations: {
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
    getAdminToken(state, payload) {
      state.adminToken = payload.access;
      state.adminRefreshToken = payload.refresh;
      state.adminLoggedIn = true;
    },
    getGenre(state, payload) {
      state.genres = payload;
    },
  },
  actions: {
    toggleLayoutShow({ commit }, payload) {
      commit('toggleLayoutShow', payload);
    },
    adminLogin({ commit }, payload) {
      commit('getAdminToken', payload);
    },
  },
  modules: {
  },
});
