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

export default {
  name: 'NotFound',
  setup() {
    const route = useRoute();
    const store = useStore();
    const query = computed(() => route.params.query);
    store.commit('toggleSearchShow');
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    return { query };
  },
};
</script>

<style>

</style>
