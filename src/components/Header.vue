<template>
  <header class="h-14 p-2 bg-gray-800 w-full">
    <div class="container flex justify-between items-center m-auto">
      <div>
        <div class="relative" v-show="showSearch">
          <i class="fas fa-search absolute top-2 left-3"></i>
          <input type="search" class="pl-9 pr-3 py-1 rounded-full outline-none"
            placeholder="歌曲或歌手">
        </div>
      </div>
      <router-link class="text-purple-200 font-bold text-sm px-3 py-2
        rounded-sm border border-purple-200"
       :to="{ name: 'login' }">登入</router-link>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const showSearch = computed(() => store.state.showSearch);
    return {
      showSearch,
    };
  },
};
</script>
