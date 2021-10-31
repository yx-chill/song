<template>
  <div class="text-white">
    <h2 class="text-2xl font-bold mb-9">瀏覽全部</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
      <li class="w-full aspect-w-1 aspect-h-1 bg-gray-400 rounded-md"></li>
    </ul>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    store.commit('toggleSearchShow');
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    onMounted(() => store.dispatch('toggleLayoutShow', true));
    return {
    };
  },
};
</script>
