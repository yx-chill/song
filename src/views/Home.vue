<template>
  <div class="p-7">
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in songList" :key="song.id">
        <router-link :to="{ name: 'song', params: { id: song.id } }"
          class="song block p-4 bg-gray-600 hover:bg-gray-500 rounded">
          <div class="aspect-w-1 aspect-h-1 rounded overflow-hidden mb-4">
            <img :src="song.image ? song.image : 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo">
          </div>
          <h2 class="text-white mb-2" :title="song.name">{{ song.name }}</h2>
          <p class="text-gray-300">{{ song.composer }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed } from 'vue';
import { useStore } from 'vuex';
// import storage from '@/models/storage';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const songList = computed(() => store.state.songList);
    return {
      songList,
    };
  },
};
</script>

<style scoped>
.song {
  transition: .5s;
}
</style>
