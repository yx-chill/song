<template>
  <nav class="side-bar bg-gray-900 h-full px-2 py-4 text-gray-300">
    <div class="logo h-12 text-white text-2xl font-black text-center">
      <i class="fas fa-music"></i>
      LOGO</div>
    <div class="text-black text-lg p-3 bg-yellow-500 rounded-md mb-2"
      v-if="userLoggedIn">
      <i class="fas fa-address-card mr-3"></i>{{ username }}
    </div>
    <ul class="text-lg mb-10">
      <li class="px-3 py-1 hover:bg-gray-400 rounded-md">
        <router-link class="block w-full" :to="{ name: 'about' }">
        <i class="fas fa-home text-xl mr-3"></i>首頁
        </router-link></li>
      <li class="px-3 py-1 hover:bg-gray-400 rounded-md">
        <router-link class="block w-full" :to="{ name: 'search' }">
        <i class="fas fa-search text-xl mr-4"></i>搜尋
        </router-link>
      </li>
    </ul>
    <ul>
      <li class="px-3 py-1 hover:bg-gray-500 rounded-md cursor-pointer">
        <router-link :to="{ name: 'favorite' }">
        <i class="far fa-heart text-xl mr-3"></i>收藏的歌曲
        </router-link></li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SideBar',
  setup() {
    const store = useStore();
    const userLoggedIn = computed(() => store.state.userLoggedIn);
    const username = computed(() => store.state.username);
    return {
      userLoggedIn, username,
    };
  },
};
</script>

<style>
.side-bar {
  width: 240px;
}
</style>
