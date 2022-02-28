<template>
  <div class="p-5">
    <div class="font-bold text-2xl text-white mb-3">
      <div v-show="result.length">
        <p v-if="result.length">有關 "{{ query }}" 的搜尋結果</p>
        <p v-else>很抱歉，沒有 "{{ query }}" 的搜尋結果</p>
      </div>
      </div>
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
  computed, onBeforeUnmount, reactive, toRefs, watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

// 查詢結果
const handleGetResult = (store) => {
  const route = useRoute();
  const query = computed(() => route.params.query);
  const data = reactive({ result: [] });
  const getResult = async () => {
    store.commit('getDefaultQuery', query.value);
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
  // 監聽查詢參數，有改變會自動執行
  watchEffect(() => getResult());
  const { result } = toRefs(data);
  return { query, result };
};

export default {
  name: 'Query',
  setup() {
    const store = useStore();
    const { result, query } = handleGetResult(store);
    store.commit('toggleSearchShow');

    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
      store.commit('getDefaultQuery', '');
    });

    return { query, result };
  },
};
</script>
