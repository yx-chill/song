import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    showLayout: true,
    showSearch: false,
    userLoggedIn: false,
    username: '1',
    accessToken: '',
    refreshToken: '',
    adminLoggedIn: false,
    adminToken: '',
    adminRefreshToken: '',
    genres: '',
  },
  mutations: {
    login(state) {
      state.userLoggedIn = true;
    },
    getUsername(state, payload) {
      state.username = payload;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
      state.username = '';
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
    login({ commit }, payload) {
      commit('getToken', payload);
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
    async getUsername({ commit }, payload) {
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/user',
        headers: { Authorization: `Bearer ${payload.access}` },
      }).then((res) => {
        commit('getUsername', res.data.data.name);
      }).catch((error) => {
        console.log(error);
      });
    },
    adminLogin({ commit }, payload) {
      commit('getAdminToken', payload);
    },
  },
  modules: {
  },
});
