<template>
  <div class="p-3">
    <div class="text-green-500 text-9xl font-bold">404</div>
    <div class="font-bold text-2xl text-white">{{ query }}</div>
  </div>
</template>

<script>
import { onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'Query',
  setup() {
    const route = useRoute();
    const store = useStore();
    const query = computed(() => route.params.query);
    store.commit('toggleSearchShow');
    axios({
      method: 'get',
      url: `https://api.sally-handmade.com/music/v1/music?search=${query.value}`,
    }).then((res) => {
      console.log(res.data.data);
    }).catch((error) => {
      console.log(error);
    });
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    return { query };
  },
};
</script>

<style>

</style>
