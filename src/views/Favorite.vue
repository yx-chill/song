<template>
  <div class="p-7 text-white text-2xl">
    <div v-show="songs.length">
      <h2 class="mb-5" v-if="songs.length">收藏的歌曲</h2>
      <h2 v-else>尚未有收藏歌曲...</h2>
    </div>
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
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import storage from '@/includes/storage';
import request from '@/includes/request';
import { warningNotify } from '@/composables/useNotification';

// 取得收藏列表
const handleFavoriteSong = () => {
  const router = useRouter();
  const favoriteList = reactive({ songs: [] });

  const getFaoriteSong = (async () => {
    if (!storage.get('userToken')) {
      router.push({ name: 'home' }).then(() => warningNotify('請先登入'));
      return;
    }
    await request('get', 'v1/music/like').then((res) => {
      favoriteList.songs = res.data.data;
    }).catch((err) => {
      console.log(err);
    });
  });
  const { songs } = toRefs(favoriteList);

  return { getFaoriteSong, songs };
};

export default {
  name: 'Favorite',
  setup() {
    // eslint-disable-next-line global-require
    const defaultImg = require('../assets/headphone.jpg');
    const { getFaoriteSong, songs } = handleFavoriteSong();
    getFaoriteSong();

    return { defaultImg, songs };
  },
};
</script>
