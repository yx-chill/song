<template>
  <div class="player text-gray-300 text-sm px-4 flex items-center w-full
    bg-gray-800 absolute bottom-0">
    <div class="w-30">
      <div class="flex items-center" v-if="currentSong.name">
        <div class="w-14 h-14 mr-3 flex justify-center items-center bg-white rounded">
          <img alt="song photo"
            :src="currentSong.image || require('@/assets/headphone.jpg')">
        </div>
        <div>
            <p class=" text-base mb-1">{{ currentSong.name }}</p>
            <p>{{ currentSong.composer }}</p>
        </div>
      </div>
    </div>
    <div class="w-2/5 text-center px-2 relative">
      <div class="mb-2">
        <button type="button" class="text-xl" @click="fastwind(-fastwindSec)">
        <i class="fas fa-backward"></i>
        </button>
        <button type="button"  class="w-9 h-9 rounded-full border mx-7 bg-gray-300"
          @click="toggleAudio">
          <i class="fa text-sm text-gray-900" :class="{ 'fa-play': !play, 'fa-pause': play }"></i>
        </button>
        <button type="buton" class="text-xl" @click="fastwind(fastwindSec)">
          <i class="fas fa-forward"></i>
        </button>
      </div>
      <div class="flex justify-between items-center">
        <span class="w-16">{{ seek }}</span>
          <div class="w-full mx-3">
            <div class="flex  items-center h-6 w-full cursor-pointer relative">
              <span class="block h-1 w-full bg-gray-400 rounded">
                <span class="block w-3 h-3 rounded-full bg-gray-300 absolute top-2/4
                  transform -translate-x-1/2 -translate-y-1/2"
                  :style="{ left: playerProgress }"></span>
                <span class="block h-full rounded bg-gradient-to-r from-purple-200 to-purple-300"
                  :style="{ width: playerProgress }"></span>
                <span class="absolute inset-0" @click="updateSeekClk($event)"
                  @mousemove="updateSeek($event)" @mouseout="isClick = false"></span>
              </span>
            </div>
          </div>
        <span class="w-16">{{ duration }}</span>
      </div>
    </div>
    <div class="w-30 flex items-center relative">
      <div class="ml-5 mr-3">
        <i class="fas fa-volume-up text-xl cursor-pointer" @click="mute(false)"
          v-if="volumeWidth"></i>
        <i class="fas fa-volume-off mr-3 text-xl cursor-pointer" @click="mute(true)" v-else></i>
      </div>
      <div class="flex items-center h-6 w-1/3 cursor-pointer relative">
        <span class="block h-1 w-full bg-gray-400 rounded">
          <span class="block w-3 h-3 rounded-full bg-gray-300 absolute top-2/4
            transform -translate-x-1/2 -translate-y-1/2"
            :style="{ left: `${ volumeWidth * 100 }%` }"></span>
          <span class="block h-full rounded bg-gradient-to-r from-purple-200 to-purple-300"
            :style="{ width: `${ volumeWidth * 100 }%` }"></span>
          <span class="absolute inset-0" @click="updateVolumeClk($event)"
            @mousemove="updateVolume($event)" @mouseout="isClick = false"></span>
        </span>
      </div>
      <button type="button" class="ml-3" @click="showSetting = !showSetting">
        <i class="fas fa-cog text-xl transition transform hover:rotate-180" ref="settingBtn"></i>
      </button>
      <Setting v-show="showSetting" class="absolute -top-3 left-1/3 transform -translate-y-full"
        @showSetting="(e) => showSetting = e" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import Setting from '@/components/Setting.vue';

export default {
  name: 'Player',
  components: { Setting },
  setup() {
    const store = useStore();
    const showSetting = ref(false);
    const isClick = ref(false);
    const settingBtn = ref(null);
    document.addEventListener('click', (e) => {
      if (e.target === settingBtn.value) return;
      showSetting.value = false;
    }, true);
    document.addEventListener('mousedown', () => { isClick.value = true; });
    document.addEventListener('mouseup', () => { isClick.value = false; });
    const play = computed(() => store.getters.playing);
    const seek = computed(() => store.state.seek);
    const duration = computed(() => store.state.duration);
    const playerProgress = computed(() => store.state.playerProgress);
    const volumeWidth = computed(() => store.state.volumeWidth);
    const currentSong = computed(() => store.state.currentSong);
    const mute = (e) => store.commit('mute', e);
    const updateSeek = (e) => {
      if (isClick.value) store.dispatch('updateSeek', e);
    };
    const updateSeekClk = (e) => store.dispatch('updateSeek', e);
    const updateVolume = (e) => {
      if (isClick.value) store.dispatch('updateVolume', e);
    };
    const updateVolumeClk = (e) => store.dispatch('updateVolume', e);
    const toggleAudio = () => store.dispatch('toggleAudio');
    const seconds = reactive({
      five: 5,
      ten: 10,
      fifteen: 15,
    });
    const fastwindSec = computed(() => seconds[store.state.fastwindSec]);
    const fastwind = (sec) => store.dispatch('fastwind', sec);

    return {
      settingBtn,
      showSetting,
      isClick,
      play,
      seek,
      duration,
      playerProgress,
      volumeWidth,
      currentSong,
      mute,
      toggleAudio,
      updateSeek,
      updateSeekClk,
      fastwind,
      fastwindSec,
      updateVolume,
      updateVolumeClk,
    };
  },
};
</script>

<style scoped>
.player {
  height: 90px;
}
.w-30 {
  width: 30%;
}
.fa.fa-play {
  margin-left: 2px;
}
</style>
