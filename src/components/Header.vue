<template>
  <header class="px-10 py-2 bg-gray-800 w-full">
    <div class="container flex justify-between items-center flex-wrap md:flex-nowrap
      m-auto">
      <div class="h-8 order-1 sm:order-none my-1">
        <div class="relative w-48" v-show="showSearch">
          <i class="fas fa-search absolute top-2 left-3"></i>
          <input type="search" class="pl-9 pr-3 py-1 rounded-full outline-none w-full"
            placeholder="歌曲或歌手" ref="queryStr" :value="defaultQuery" @keyup.enter="search">
        </div>
      </div>
      <div v-if="!isLogin" class="my-1">
        <router-link class="text-purple-100 font-bold text-sm hover:underline mr-5"
        :to="{ name: 'register' }">註冊</router-link>
        <router-link class="text-purple-200 font-bold text-sm px-3 py-2
          rounded-sm border border-purple-200 hover:bg-purple-200 hover:text-gray-800
          transition duration-300"
        :to="{ name: 'login' }">登入</router-link>
      </div>
      <button type="button" class="text-purple-200 font-bold text-sm px-3 py-2
        rounded-sm border border-purple-200 hover:bg-purple-200 hover:text-gray-800
          transition duration-300" v-else @click="logout" :disabled="disable">登出</button>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Header',
  emits: ['logout'],
  props: ['isLogin', 'title', 'disable'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const isLogin = ref(props.isLogin);
    const queryStr = ref(null);
    const defaultQuery = computed(() => store.state.defaultQuery);
    const showSearch = computed(() => store.state.showSearch);
    const logout = async () => {
      emit('logout');
    };
    const search = () => {
      if (!queryStr.value.value) {
        return;
      }
      router.push({ name: 'query', params: { query: queryStr.value.value } });
    };
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      showSearch, isLogin, logout, defaultQuery, search, queryStr,
    };
  },
};
</script>
