import { createStore } from 'vuex';
import { Howl } from 'howler';
import helper from '../includes/helper';

export default createStore({
  state: {
    showSearch: false,
    userLoggedIn: false,
    username: '',
    genres: '',
    songList: {},
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
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
      console.log(payload);
      state.sound = new Howl({
        src: payload.file,
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
    getSongList(state, payload) {
      state.songList = payload;
    },
  },
  actions: {
    async newSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }
      commit('newSong', payload);
      state.sound.play();
      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, e) {
      if (!state.sound.playing) {
        return;
      }
      const { x, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;
      state.sound.seek(seconds);

      state.sound.once('seek', () => dispatch('progress'));
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  modules: {
  },
});
