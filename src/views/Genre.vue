<template>
  <div class="p-5 text-gray-300">
    {{ genreId }}
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
import { computed, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
// 檢查是否有該曲風
const handleGetGenre = (genreId) => {
  const router = useRouter();
  const getGenre = async () => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music-type/${genreId.value}`,
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      if (error.response.status === 404) {
        router.push({ name: 'notfound' });
      }
    });
  };
  return getGenre;
};
// 取得該曲風音樂
const handleGetGenreSongs = (genreId) => {
  const data = reactive({ songs: [] });
  const getGenreSongs = async () => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music?type=${genreId.value}`,
    }).then((res) => {
      data.songs = res.data.data;
      console.log(data.songs);
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
    const route = useRoute();
    const genreId = computed(() => route.params.genreId);
    const getGenre = handleGetGenre(genreId);
    getGenre();
    const { getGenreSongs, songs } = handleGetGenreSongs(genreId);
    getGenreSongs();
    return { songs, genreId };
  },
};
</script>
