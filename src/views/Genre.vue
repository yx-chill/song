<template>
  <div class="p-5 text-gray-300">
    <h2 class="text-2xl font-bold" v-if="isNotExist">暫無此分類歌曲...</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in songs" :key="song.id">
        <router-link :to="{ name: 'song', params: { songId: song.id } }"
          class="song block p-4 bg-gray-600 hover:bg-gray-500 rounded">
          <div class="aspect-w-1 aspect-h-1 rounded overflow-hidden mb-4">
            <div class="absolute inset-0 bg-center filter blur-xl"
              :style="{backgroundImage: song.image ?
              'url(' + song.image + ')' : 'url(' + defaultImg + ')' }"></div>
            <img :src="song.image || require('@/assets/headphone.jpg')" alt="song photo">
          </div>
          <h2 class="text-white mb-2" :title="song.name">{{ song.name }}</h2>
          <p class="text-gray-300">{{ song.composer }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  computed, reactive, ref, toRefs, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import request from '@/includes/request';
import { showLoading, hideLoading } from '@/composables/useLoading';

// 檢查是否有該曲風
const handleGetGenre = (genreId) => {
  const router = useRouter();
  const getGenre = async () => {
    if (genreId.value === undefined) return;

    try {
      await request('get', `v1/music-type/${genreId.value}`);
    } catch (err) {
      if (err.response.status === 404) {
        router.push({ name: 'notfound' });
      }
    }
  };
  return getGenre;
};

// 取得該曲風音樂
const handleGetGenreSongs = (genreId) => {
  const data = reactive({ songs: [] });
  const isNotExist = ref(false);
  const getGenreSongs = async () => {
    showLoading();
    try {
      const res = await request('get', 'v1/music', {
        type: genreId.value,
      });
      data.songs = res.data.data;
      isNotExist.value = !res.data.data.length;
    } catch (err) {
      console.log(err);
    }
    hideLoading();
  };
  const { songs } = toRefs(data);

  return { getGenreSongs, songs, isNotExist };
};

export default {
  name: 'Genre',
  setup() {
    const route = useRoute();
    const genreId = computed(() => route.params.genreId);
    // eslint-disable-next-line global-require
    const defaultImg = require('../assets/headphone.jpg');

    const getGenre = handleGetGenre(genreId);
    const { getGenreSongs, songs, isNotExist } = handleGetGenreSongs(genreId);

    getGenre();
    getGenreSongs();

    watch(genreId, () => {
      getGenre();
      getGenreSongs();
    });

    return {
      songs, genreId, isNotExist, defaultImg,
    };
  },
};
</script>
