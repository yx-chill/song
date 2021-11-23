<template>
  <div class="p-3">
    <div class="font-bold text-2xl text-white">{{ query }}</div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li v-for="song in result" :key="song.id">
        <router-link :to="{ name: 'song', params: { songId: song.id } }"
          class="song block p-4 bg-gray-600 hover:bg-gray-500 rounded">
          <div class="aspect-w-1 aspect-h-1 rounded overflow-hidden mb-4">
            <img :src="song.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo">
          </div>
          <h2 class="text-white mb-2" :title="song.name">{{ song.name }}</h2>
          <p class="text-gray-300">{{ song.composer }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  onBeforeUnmount, computed, reactive, toRefs, onBeforeMount,
} from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';
// 查詢結果
const handleGetResult = () => {
  const route = useRoute();
  const query = computed(() => route.params.query);
  const data = reactive({ result: [] });
  const getResult = async () => {
    await axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music?search=${query.value}`,
    }).then((res) => {
      console.log(res.data.data);
      console.log(query.value);
      data.result = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  };
  const { result } = toRefs(data);
  return { getResult, query, result };
};

export default {
  name: 'Query',
  setup() {
    const store = useStore();
    store.commit('toggleSearchShow');
    const { result, getResult, query } = handleGetResult();
    onBeforeMount(() => {
      getResult();
    });
    onBeforeRouteUpdate(() => {
      getResult();
    });
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    return { query, result };
  },
};
</script>
