<template>
  <div class="text-white">
    <h2 class="text-2xl font-bold mb-9">瀏覽全部</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="genre in genres" :key="genre.id"
        class="w-full aspect-w-1 aspect-h-1 rounded-md"
        :style="{ 'background-color': genre.color }">13</li>
    </ul>
    <input type="color" v-model="testcolor" />
  </div>
</template>

<script>
import {
  onBeforeUnmount, ref, computed, watchEffect,
} from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    const testcolor = ref('#ff0000');
    store.commit('toggleSearchShow');
    const genres = computed(() => store.state.genres);
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    watchEffect(() => console.log(testcolor.value));
    return {
      testcolor, genres,
    };
  },
};
</script>
