import { createStore } from 'vuex';
import { Howl } from 'howler';

export default createStore({
  state: {
    showSearch: false,
    userLoggedIn: false,
    username: '',
    genres: '',
    songList: {},
    currentSong: {},
    sound: {},
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
    toggleSearchShow(state) {
      state.showSearch = !state.showSearch;
    },
    getGenre(state, payload) {
      state.genres = payload;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    getSongList(state, payload) {
      state.songList = payload;
    },
  },
  actions: {
    async newSong({ commit, state }, payload) {
      commit('newSong', payload);
      state.sound.play();
    },
  },
  modules: {
  },
});
