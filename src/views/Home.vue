<template>
  <div class="h-full p-7 overflow-auto" ref="main">
    <div class="p-3 text-blue-900 flex gap-2">
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'genaral' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click="getSong('genaral'), currentTag = 'genaral'"
        :disabled="currentTag === 'genaral'">一般</button>
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'hot' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click="getSong('hot'), currentTag = 'hot'" :disabled="currentTag === 'hot'">收藏數</button>
      <button class="rounded-full px-3 py-1 transition duration-300"
        :class="currentTag === 'watch' ? 'bg-gray-200' :
        'bg-gray-600 text-white hover:bg-gray-500'"
        @click="getSong('watch'), currentTag = 'watch'"
        :disabled="currentTag === 'watch'">播放次數</button>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
      gap-5 transition duration-500">
      <li v-for="song in songs" :key="song.id" class="transition duration-500">
        <router-link :to="{ name: 'song', params: { songId: song.id } }"
          class="block p-4 bg-gray-600 hover:bg-gray-500 rounded duration-500">
          <div class="aspect-w-1 aspect-h-1 rounded overflow-hidden mb-4 relative">
            <!-- :style="{backgroundImage: song.image ?
            'url(' + song.image + ')' : 'url(' + defaultImg + ')' }" -->
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
// @ is an alias to /src
import {
  reactive, ref, toRefs, onMounted,
} from 'vue';
import request from '@/includes/request';
import { showLoading, hideLoading } from '@/composables/useLoading';

export default {
  name: 'Home',
  setup() {
    const currentTag = ref('genaral');
    // eslint-disable-next-line global-require
    const defaultImg = require('../assets/headphone.jpg');
    const main = ref(null);
    const songList = reactive({ songs: [] });
    let currentPage = 1;
    let lastPage;

    const getSongList = async () => {
      showLoading();
      try {
        const res = await request('get', 'v1/music');
        songList.songs = res.data.data;
        lastPage = res.data.meta.last_page;
      } catch (error) {
        console.log(error);
      }
      hideLoading();
    };
    getSongList();

    const getSong = async (currTag, page = 1) => {
      if (page === 1) {
        songList.songs = [];
        currentPage = 1;
        showLoading();
      }
      let params;
      switch (currTag) {
        case 'genaral':
          params = {};
          break;
        case 'hot':
          params = { order: 'music_likes_count' };
          break;
        case 'watch':
          params = { order: 'watched' };
          break;
        default:
          params = {};
      }
      params.page = page;
      try {
        const data = await request('get', 'v1/music', params);
        currentPage = data.data.meta.current_page;
        lastPage = data.data.meta.last_page;
        songList.songs = [...songList.songs, ...data.data.data];
      } catch (error) {
        console.log(error);
      }
      hideLoading();
    };

    const handleScroll = (e) => {
      const { clientHeight, scrollTop, scrollHeight } = e.srcElement;
      if (scrollTop + clientHeight >= scrollHeight - 200 && currentPage < lastPage) {
        currentPage += 1;
        getSong(currentTag, currentPage);
      }
    };

    onMounted(async () => {
      main.value.addEventListener('scroll', handleScroll);
    });

    const { songs } = toRefs(songList);

    return {
      songs, currentTag, defaultImg, main, getSong,
    };
  },
};
</script>
