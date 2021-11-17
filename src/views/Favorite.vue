<template>
  <div class="p-7 text-white text-2xl">
    <h2 v-if="favoriteList">尚未有收藏歌曲...</h2>
    <h2 class="mb-5" v-else>收藏的歌曲</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in favoriteList" :key="song.id">
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
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';

export default {
  name: 'Favorite',
  setup() {
    const router = useRouter();
    const favoriteList = ref([]);
    onBeforeMount(async () => {
      if (!storage.get('userToken')) {
        router.push({ name: 'home' });
        return;
      }
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/music/like',
        headers: { Authorization: `Bearer ${storage.get('userToken')}` },
      }).then((res) => {
        console.log(res);
        favoriteList.value = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    });
    return {
      favoriteList,
    };
  },
};
</script>

<style>

</style>
