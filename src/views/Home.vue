<template>
  <div class="p-7">
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in songs" :key="song.id">
        <router-link :to="{ name: 'song', params: { id: song.id } }"
          class="song block p-4 bg-gray-600 hover:bg-gray-500 rounded">
          <div class="aspect-w-1 aspect-h-1 rounded overflow-hidden mb-4">
            <img :src="song.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo">
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
import { reactive, toRefs } from 'vue';
import axios from 'axios';

const handleSongList = () => {
  const songList = reactive({ songs: [] });
  const getSongList = (async () => {
    await axios({
      method: 'get',
      url: 'https://api.sally-handmade.com/music/v1/music',
    }).then((res) => {
      songList.songs = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  });
  return { getSongList, songList };
};

export default {
  name: 'Home',
  setup() {
    const { getSongList, songList } = handleSongList();
    getSongList();
    const { songs } = toRefs(songList);
    return {
      songs,
    };
  },
};
</script>

<style scoped>
.song {
  transition: .5s;
}
</style>
