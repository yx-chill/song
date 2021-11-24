<template>
  <div class="player text-gray-300 text-sm px-4 flex items-center w-full
    bg-gray-800 absolute bottom-0">
    <div class="w-30">
      <div class="flex items-center" v-if="currentSong.name">
        <div class="w-14 h-14 mr-3">
          <img alt="song photo"
            :src="currentSong.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'">
        </div>
        <div>
            <p class=" text-base mb-1">{{ currentSong.name }}</p>
            <p>{{ currentSong.composer }}</p>
        </div>
      </div>
    </div>
    <div class="w-2/5 text-center px-2">
      <div class="mb-2">
        <button type="button" class="text-xl" >
        <i class="fas fa-backward"></i>
        </button>
        <button type="button"  class="w-9 h-9 rounded-full border mx-7 bg-gray-300"
          @click="toggleAudio">
          <i class="fa text-sm text-gray-900" :class="{ 'fa-play': !play, 'fa-pause': play }"></i>
        </button>
        <button type="buton" class="text-xl" >
        <i class="fas fa-forward"></i>
        </button>
      </div>
      <div class="flex justify-between items-center">
        <span class="w-16">{{ seek }}</span>
          <div class="w-full mx-3">
            <span class="block h-1 w-full bg-gray-400 rounded cursor-pointer relative"
              @click.prevent="updateSeek($event)">
              <span class="block w-3 h-3 rounded-full bg-gray-300 absolute top-2/4
                transform -translate-x-1/2 -translate-y-1/2"
                :style="{ left: playerProgress }"></span>
              <span class="block h-full rounded bg-gradient-to-r from-purple-200 to-purple-300"
                :style="{ width: playerProgress }"></span>
            </span>
          </div>
        <span class="w-16">{{ duration }}</span>
      </div>
    </div>
    <div class="w-30"></div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Player',
  setup() {
    const store = useStore();
    const play = computed(() => store.getters.playing);
    const seek = computed(() => store.state.seek);
    const duration = computed(() => store.state.duration);
    const playerProgress = computed(() => store.state.playerProgress);
    const currentSong = computed(() => store.state.currentSong);
    const updateSeek = (e) => store.dispatch('updateSeek', e);
    const toggleAudio = () => {
      store.dispatch('toggleAudio');
    };
    return {
      play, seek, duration, playerProgress, currentSong, toggleAudio, updateSeek,
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
