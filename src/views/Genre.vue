<template>
  <div class="p-5 text-gray-300">
    <h2 class="text-2xl font-bold" v-if="!songs.length">暫無此分類歌曲...</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in songs" :key="song.id">
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
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
// 取得該曲風音樂
const handleGetGenreSongs = () => {
  const route = useRoute();
  const { genreId } = route.params;
  const data = reactive({ songs: [] });
  const getGenreSongs = async () => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music?type=${genreId}`,
    }).then((res) => {
      data.songs = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  };
  const { songs } = toRefs(data);
  return { getGenreSongs, songs };
};

export default {
  name: 'Genre',
  setup() {
    const { getGenreSongs, songs } = handleGetGenreSongs();
    getGenreSongs();
    return { songs };
  },
};
</script>
