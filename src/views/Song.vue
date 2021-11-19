<template>
  <section class="song p-5 w-full h-full flex">
    <div class="w-1/2 bg-yellow-400 bg-opacity-30 relative">
      <button class="bg-gray-900 rounded-full w-12 h-12 flex justify-center items-center
        absolute top-3 right-3">
            <i class="far fa-heart text-2xl text-red-600"
              :class="like ? 'fa' : 'far'" @click="favorite"></i>
      </button>
      <div class="record w-60 h-60 relative mb-10"
        :style="{ 'animation-play-state': play ? 'running' : 'paused' }">
        <div class="w-28 h-28 rounded-full overflow-hidden absolute top-1/2 left-1/2
          transform -translate-x-1/2  -translate-y-1/2">
          <img :src="data.song.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo"
            class="w-full h-full">
        </div>
      </div>
      <div class="p-10">
        <div class="flex mb-10">
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
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';

export default {
  name: 'Song',
  setup() {
    const store = useStore();
    const route = useRoute();
    const { id } = route.params;
    const like = ref(false);
    const favorite = async () => {
      like.value = !like.value;
      if (like.value) {
        await axios({
          method: 'get',
          url: `https://api.sally-handmade.com/music/v1/music/${id}/like`,
          headers: { Authorization: `Bearer ${storage.get('userToken')}` },
        }).then((res) => {
          console.log(res);
          like.value = true;
        }).catch((err) => {
          console.log(err);
        });
      } else {
        await axios({
          method: 'get',
          url: `https://api.sally-handmade.com/music/v1/music/${id}/unlike`,
          headers: { Authorization: `Bearer ${storage.get('userToken')}` },
        }).then((res) => {
          console.log(res);
          like.value = false;
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    const play = computed(() => store.getters.playing);
    const data = reactive({ song: [] });
    let song = {};
    const getSongData = async () => {
      await axios({
        method: 'get',
        url: `https://api.sally-handmade.com/music/v1/music/${id}`,
      }).then((res) => {
        song = res.data.data;
        data.song = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
    };
    getSongData();
    const newSong = () => {
      store.dispatch('newSong', song);
    };
    return {
      id, play, song, data, newSong, like, favorite,
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
