<template>
  <header class="h-14 px-10 py-2 bg-gray-800 w-full">
    <div class="container flex justify-between items-center m-auto">
      <div class="h-8">
        <div class="relative" v-show="showSearch">
          <i class="fas fa-search absolute top-2 left-3"></i>
          <input type="search" class="pl-9 pr-3 py-1 rounded-full outline-none"
            placeholder="歌曲或歌手" v-model="queryStr" @keyup.enter="search(queryStr)">
        </div>
      </div>
      <div v-if="!isLogin">
        <router-link class="text-purple-100 font-bold text-sm hover:underline mr-5"
        :to="{ name: 'register' }">註冊</router-link>
        <router-link class="text-purple-200 font-bold text-sm px-3 py-2
          rounded-sm border border-purple-200 hover:bg-purple-200 hover:text-gray-800
          transition duration-300"
        :to="{ name: 'login' }">登入</router-link>
      </div>
      <button type="button" class="text-purple-200 font-bold text-sm px-3 py-2
        rounded-sm border border-purple-200 hover:bg-purple-200 hover:text-gray-800
          transition duration-300" v-else @click="logout">登出</button>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';

export default {
  name: 'Header',
  props: ['isLogin', 'title'],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isLogin = ref(props.isLogin);
    const queryStr = ref('');
    const showSearch = computed(() => store.state.showSearch);
    const logout = async () => {
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/logout',
        headers: { Authorization: `Bearer ${storage.get('userToken')}` },
      }).then(() => {
        storage.set('userToken', '');
        storage.set('userRefreshToken', '');
        console.log('success');
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    };
    const search = (query) => {
      if (!query) {
        return;
      }
      router.push({ name: 'query', params: { query } });
    };
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      showSearch, isLogin, logout, queryStr, search,
    };
  },
};
</script>
