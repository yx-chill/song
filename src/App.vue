<template>
  <main class="main flex" v-show="showLayout">
    <SideBar />
    <section class="w-full flex flex-col">
      <Header />
      <div class="bg-gray-700 flex-grow overflow-auto p-7">
      <router-view />
      </div>
    </section>
  </main>
  <Player v-show="showLayout" />
  <router-view name="back" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Player from '@/components/Player.vue';
import storage from '@/models/storage';

export default {
  name: 'App',
  components: {
    Header, SideBar, Player,
  },
  setup() {
    const store = useStore();
    const showLayout = computed(() => store.state.showLayout);
    if (storage.get('userToken')) {
      store.commit('login');
      axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/user',
        headers: { Authorization: `Bearer ${storage.get('userToken')}` },
      }).then((res) => {
        store.commit('getUsername', res.data.data.name);
      }).catch((error) => {
        console.log(error);
      });
    }
    return {
      showLayout,
    };
  },
};
</script>

<style class="scoped">
::-webkit-scrollbar {
  width: 8px;
  background: #374151;
}
::-webkit-scrollbar-thumb {
  background: #5a5a5a;
  border-radius: 8px;
}
.main {
  height: calc(100vh - 90px);
}
#nprogress .bar {
  background: red !important;
  height: 4px !important;
}
</style>
