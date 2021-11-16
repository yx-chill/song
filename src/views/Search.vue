<template>
  <div class="text-white">
    <h2 class="text-2xl font-bold mb-9">瀏覽全部</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="genre in genres" :key="genre.id"
        class="w-full aspect-w-1 aspect-h-1 rounded-md"
        :style="{ 'background-color': genre.color }">
        <router-link :to="{ name: 'genre', params: { genre: genre.name } }">
        </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    store.commit('toggleSearchShow');
    const genres = ref([]);
    store.commit('toggleSearchShow');
    axios({
      method: 'get',
      url: 'https://api.sally-handmade.com/music/v1/music-type',
    }).then((res) => {
      console.log(res.data.data);
      genres.value = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
    return {
      genres,
    };
  },
};
</script>
