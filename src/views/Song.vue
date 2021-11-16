<template>
  <section class="bg-gray-300">
    <div class="flex justify-center items-center">
      <div class="record w-60 h-60 relative">
        <div class=" w-28 rounded-full overflow-hidden absolute top-1/2 left-1/2
          transform -translate-x-1/2  -translate-y-1/2">
        <img :src="song.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo">
        </div>
      </div>
      <div>
        <h2>{{ song.name }}</h2>
        <span>{{ song.composer }}</span>
      </div>
    </div>
    <section>
      <button @click.prevent="newSong(song)">
        <i class="fa fa-play"></i>
      </button>
    </section>
  </section>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'Song',
  setup() {
    const store = useStore();
    const route = useRoute();
    const { id } = route.params;
    let song = reactive({});
    onBeforeMount(async () => {
      await axios({
        method: 'get',
        url: `https://api.sally-handmade.com/music/v1/music/${id}`,
      }).then((res) => {
        song = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
    });
    const newSong = () => {
      store.dispatch('newSong', song);
    };
    return {
      id, song, newSong,
    };
  },
};
</script>

<style>
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
