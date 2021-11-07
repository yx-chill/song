<template>
  <header class="h-14 px-10 py-2 bg-gray-800 w-full">
    <div class="container flex justify-between items-center m-auto">
      <div class="h-8">
        <div class="relative" v-show="showSearch">
          <i class="fas fa-search absolute top-2 left-3"></i>
          <input type="search" class="pl-9 pr-3 py-1 rounded-full outline-none"
            placeholder="歌曲或歌手">
        </div>
      </div>
      <div>
        <router-link class="text-purple-200 font-bold text-sm px-3 py-2
          rounded-sm border border-purple-200"
        :to="{ name: 'login' }" v-if="!isLogin">登入</router-link>
        <button type="button" class="text-purple-200 font-bold text-sm px-3 py-2
          rounded-sm border border-purple-200" v-else @click="logout">登出</button>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import storage from '@/models/storage';

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const showSearch = computed(() => store.state.showSearch);
    const isLogin = computed(() => store.state.userLoggedIn);
    const logout = async () => {
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/logout',
        headers: { Authorization: `Bearer ${storage.get('userToken')}` },
      }).then(() => {
        store.commit('logout');
        storage.set('userToken', '');
        storage.set('userRefreshToken', '');
        console.log('success');
        window.location.reload();
      }).catch((err) => {
        console.log(err);
        console.log('error');
      });
    };
    return {
      showSearch, isLogin, logout,
    };
  },
};
</script>
