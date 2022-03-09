<template>
  <section class="song p-5 w-full h-full flex">
    <div class="w-full  xl:w-1/2 bg-opacity-50 relative transform duration-300"
      :class="isPlay ? 'bg-blue-400' : 'bg-yellow-400'">
      <button class="bg-gray-900 rounded-full w-12 h-12 flex justify-center items-center
        absolute top-3 right-3" v-show="isLogin">
        <i class="far fa-heart text-2xl text-red-600"
          :class="isLike ? 'fa' : 'far'" @click="favorite"></i>
      </button>
      <div class="record w-60 h-60 relative mb-10"
        :style="{ 'animation-play-state': play ? 'running' : 'paused' }">
        <div class="w-28 h-28 rounded-full overflow-hidden absolute top-1/2 left-1/2
          transform -translate-x-1/2  -translate-y-1/2">
          <img :src="data.song.image || require('@/assets/headphone.jpg')" alt="song photo"
            class="w-full h-full">
        </div>
      </div>
      <div class="p-10">
        <div class="flex mb-10 items-center">
          <button class="bg-gray-900 rounded-full w-20 h-20 flex justify-center items-center"
            @click.prevent="newSong(song)">
            <i class="fa fa-play ml-1 text-3xl text-gray-300"></i>
          </button>
        </div>
        <div>
          <h2 class="text-4xl text-gray-800 font-black p-2 mb-10">
            {{ data.song.name }}</h2>
          <span class="text-2xl text-gray-800 font-black p-2">
            {{ data.song.composer }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  computed, ref, reactive, watch, watchEffect,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import request from '@/includes/request';
import storage from '@/includes/storage';

// 取得收藏列表
const handleFavoriteSong = (songId) => {
  const favoriteList = { songs: [] };
  const status = ref(false);
  const getFaoriteSong = (async () => {
    await request('get', 'v1/music/like').then((res) => {
      favoriteList.songs = res.data.data;
      favoriteList.songs.forEach((item) => {
        if (item.id === +songId) {
          status.value = true;
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  });
  return { getFaoriteSong, status };
};
// 取得音樂資訊
const handleGetSongData = (songId) => {
  const router = useRouter();
  const data = reactive({ song: [] });
  const song = { value: [] };
  const getSongData = async () => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music/${songId}`,
    }).then((res) => {
      song.value = res.data.data;
      data.song = res.data.data;
    }).catch((error) => {
      if (error.response.status === 404) {
        router.push({ name: 'notfound' });
      }
    });
  };
  return { data, song, getSongData };
};
// 收藏&取消收藏
const handleFavorite = (songId, status) => {
  const isLike = status;
  const favorite = async () => {
    if (!status.value) {
      await request('get', `v1/music/${songId}/like`).then((res) => {
        console.log(res);
        isLike.value = true;
      }).catch((err) => {
        console.log(err);
      });
    } else {
      await request('get', `v1/music/${songId}/unlike`).then((res) => {
        console.log(res);
        isLike.value = false;
      }).catch((err) => {
        console.log(err);
      });
    }
  };
  return { favorite, isLike };
};

export default {
  name: 'Song',
  setup() {
    const route = useRoute();
    const store = useStore();
    const { songId } = route.params;

    const curr = computed(() => store.getters.getCurrentSong);
    const play = computed(() => store.getters.playing);
    const isPlay = ref(curr.value.id === +songId);
    const isLogin = ref(storage.get('userToken'));

    const { getFaoriteSong, status } = handleFavoriteSong(songId);
    const { favorite, isLike } = handleFavorite(songId, status);
    const { data, song, getSongData } = handleGetSongData(songId);

    watchEffect(() => handleFavorite(songId, status));

    if (isLogin.value) getFaoriteSong();
    getSongData();
    const newSong = () => {
      store.dispatch('newSong', song.value);
    };

    watch(curr, () => {
      isPlay.value = (curr.value.id === +songId) || false;
    });

    return {
      songId, play, isPlay, song, data, newSong, isLike, favorite, isLogin,
    };
  },
};
</script>

<style scoped>
.song {
  background: url('https://picsum.photos/1650/780');
  background-size: cover;
}
.record {
  background: url('../assets/record.png');
  background-size: cover;
  animation: slidein 10s linear infinite;
  animation-play-state: running;
}
@keyframes slidein {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
