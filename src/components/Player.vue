<template>
  <div class="player text-gray-300 text-sm px-4 flex items-center w-full
    bg-gray-800 absolute bottom-0">
    <div class="w-30 flex items-center">
      <div class="w-14 h-14 mr-3">
        <img src="http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png" alt="song photo">
      </div>
      <div>
          <p class=" text-base mb-1">夏夜晚風</p>
          <p>伍佰</p>
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
      <div class="flex justify-center items-center">
        <span>0:00</span>
          <div class="w-full mx-3">
            <span class="block h-1 w-full bg-gray-400 rounded relative">
              <span class="block h-full w-1/2 rounded
                bg-gradient-to-r from-purple-200 to-purple-300"></span>
              <span class="block w-3 h-3 rounded-full bg-gray-300 absolute top-2/4
                transform -translate-x-1/2 -translate-y-1/2 left-1/2"></span>
            </span>
          </div>
        <span>5:00</span>
      </div>
    </div>
    <div class="w-30">3</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Player',
  setup() {
    const play = ref(false);
    const toggleAudio = () => {
      play.value = !play.value;
      console.log(play.value);
    };
    return {
      play, toggleAudio,
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
