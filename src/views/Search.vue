<template>
  <div class="text-white p-7">
    <h2 class="text-2xl font-bold mb-9">瀏覽全部</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="genre in genres" :key="genre.id"
        class="w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden"
        :style="{ 'background-color': genre.color }">
        <router-link :to="{ name: 'genre', params: { genreId: genre.id } }"
          class="genre p-2">
          <h3 class="text-2xl font-bold rounded">{{ genre.name }}</h3>
          <img :src="`https://picsum.photos/80/80?random=${genre.id}`" alt="genre photo"
          class="pic w-20 h-20 absolute bottom-1 -left-2 transform rotate-45">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    store.commit('toggleSearchShow');
    const genreData = reactive({ genres: [] });
    axios({
      method: 'get',
      url: 'https://api.sally-handmade.com/music/v1/music-type',
    }).then((res) => {
      genreData.genres = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    const { genres } = toRefs(genreData);
    return {
      genres,
    };
  },
};
</script>

<style scoped>
.pic {
  transition: .4s;
}
.genre:hover .pic {
  transform: rotate(0);
  left: 4px;
}
</style>
