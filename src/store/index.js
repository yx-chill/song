import { createStore } from 'vuex';

export default createStore({
  state: {
    showLayout: true,
    showSearch: false,
    userLoggedIn: false,
    username: '',
    genres: '',
    currentSong: {},
  },
  mutations: {
    login(state) {
      state.userLoggedIn = true;
    },
    logout(state) {
      state.userLoggedIn = false;
    },
    getUsername(state, name) {
      state.username = name;
    },
    toggleLayoutShow(state, payload) {
      state.showLayout = payload;
    },
    toggleSearchShow(state) {
      state.showSearch = !state.showSearch;
    },
    getGenre(state, payload) {
      state.genres = payload;
    },
    newSong(state, payload) {
      state.currentSong = payload;
    },
  },
  actions: {
    toggleLayoutShow({ commit }, payload) {
      commit('toggleLayoutShow', payload);
    },
    async newSong({ commit }, payload) {
      commit('newSong', payload);
    },
  },
  modules: {
  },
});
