import { createStore } from 'vuex';
import { Howl, Howler } from 'howler';
import helper from '../includes/helper';
import storage from '../includes/storage';

export default createStore({
  state: {
    showSearch: false,
    defaultQuery: '',
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
    volumeWidth: storage.get('volume') || 0.5,
    fastwindSec: storage.get('fastwindSec'),
  },
  mutations: {
    toggleSearchShow(state) {
      state.showSearch = !state.showSearch;
    },
    getDefaultQuery(state, query) {
      state.defaultQuery = query;
    },
    newSong(state, payload) {
      state.currentSong = payload;
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
    mute(state, e) {
      if (!e) {
        state.volumeWidth = 0;
      } else {
        state.volumeWidth = storage.get('volume');
      }
    },
    setFastwindSec(state, sec) {
      state.fastwindSec = sec;
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
      if (!state.sound.playing) return;

      const { x, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;
      state.sound.seek(seconds);

      state.sound.once('seek', () => dispatch('progress'));
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) return;

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    updateVolume({ state }, e) {
      const { x, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - x;
      const percentage = (clickX / width).toFixed(2);
      state.volumeWidth = percentage > 0 ? percentage : 0;
      Howler.volume(Number(percentage));
      storage.set('volume', percentage);
    },
    fastwind({ state, dispatch }, sec) {
      if (!state.sound.playing) return;
      if (state.sound.seek() + sec > state.sound.duration()) return;
      state.sound.seek(state.sound.seek() + sec);
      state.sound.once('seek', () => dispatch('progress'));
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
    getCurrentSong: (state) => {
      if (state.currentSong) {
        return state.currentSong;
      }
      return false;
    },
  },
  modules: {
  },
});
