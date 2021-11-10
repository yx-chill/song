<template>
  {{ id }}
  <section class="bg-gray-300">
    <div class="flex items-center">
      <div class="w-52 mr-3">
      <img :src="song.image" alt="song photo">
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'Song',
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = computed(() => route.params.id);
    // console.log(...store.state.songList);
    // const song = [...store.state.songList].filter((s) => s.id === +id.value);
    const song = {
      id: 6,
      type: 'Acoustic / Folk',
      name: 'aabbcc',
      composer: 'word',
      file: 'https://api.sally-handmade.com/upload/music/music/QR9U2JXOlKaZxRyH.mp3',
      image: 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png',
    };
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

</style>
