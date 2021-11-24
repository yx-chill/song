<template>
  <div class="p-7">
    <div class="p-3 text-blue-900 flex gap-2">
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'genaral' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click.prevent="genaral" :disabled="currentTag === 'genaral'">一般</button>
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'hot' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click.prevent="hot" :disabled="currentTag === 'hot'">熱門</button>
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'watch' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click.prevent="watch" :disabled="currentTag === 'watch'">播放次數</button>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
      gap-5 transition duration-500">
      <li v-for="song in songs" :key="song.id" class="transition duration-500">
        <router-link :to="{ name: 'song', params: { songId: song.id } }"
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
import { reactive, ref, toRefs } from 'vue';
import axios from 'axios';
// 取得音樂列表
const handleSongList = () => {
  const songList = reactive({ songs: [] });
  const getSongList = (async (query = '') => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music${query}`,
    }).then((res) => {
      songList.songs = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  });
  const { songs } = toRefs(songList);
  return { getSongList, songs };
};

export default {
  name: 'Home',
  setup() {
    const currentTag = ref('genaral');
    const { getSongList, songs } = handleSongList();
    getSongList();
    const genaral = () => {
      currentTag.value = 'genaral';
      getSongList();
    };
    const hot = (() => {
      currentTag.value = 'hot';
      const query = '?order=music_likes_count';
      getSongList(query);
    });
    const watch = () => {
      currentTag.value = 'watch';
      const query = '?order=watched';
      getSongList(query);
    };
    return {
      songs, currentTag, genaral, hot, watch,
    };
  },
};
</script>

<style scoped>
.song {
  transition: .5s;
}
</style>
