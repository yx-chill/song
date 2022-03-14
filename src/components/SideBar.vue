<template>
  <nav class="side-bar bg-gray-900 h-full px-2 py-4 text-gray-300 overflow-auto">
    <div class="logo h-12 text-white text-2xl font-black text-center">
      <i class="fas fa-music"></i>
      Music</div>
    <div class="text-black text-lg p-3 bg-yellow-500 rounded-md mb-2"
      v-if="isLogin">
      <i class="fas fa-address-card mr-3"></i>{{ username }}
    </div>
    <ul class="text-lg mb-10">
      <li class="px-3 py-1 hover:bg-gray-400 rounded-md"
        :class="isActive(item.path) ? 'text-purple-500' : ''"
        v-for="item in menuItem" :key="item.name">
        <router-link class="block w-full" :to="{ name: item.name }">
          <i class="text-xl mr-3" :class="item.icon"></i>{{ item.text }}
        </router-link></li>
    </ul>
    <ul>
      <li class="px-3 py-1 hover:bg-gray-500 rounded-md cursor-pointer"
        :class="isActive(['favorite']) ? 'text-purple-500' : ''" @click="toLogin">
        <i class="far fa-heart text-xl mr-3"></i>收藏的歌曲</li>
    </ul>
  </nav>
</template>

<script>
import { toRef, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  props: ['isLogin', 'username'],
  emits: ['toLogin'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const isLogin = toRef(props, 'isLogin');
    const username = toRef(props, 'username');
    const menuItem = [
      {
        name: 'home', text: '首頁', icon: 'fas fa-home', path: ['home'],
      },
      {
        name: 'search', text: '搜尋', icon: 'fas fa-search', path: ['search', 'genre', 'query'],
      },
    ];
    const toLogin = () => {
      if (!isLogin.value) {
        emit('toLogin');
      } else {
        router.push({ name: 'favorite' });
      }
    };
    const path = computed(() => route.path);
    const isActive = (to) => to.find((item) => path.value.startsWith(`/${item}`));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      menuItem, isLogin, username, toLogin, isActive,
    };
  },
};
</script>

<style>
.side-bar {
  width: 240px;
  min-width: 180px;
}
</style>
