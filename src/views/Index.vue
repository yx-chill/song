<template>
  <main class="main flex">
    <SideBar :isLogin="isLogin" />
    <section class="w-full flex flex-col">
      <Header :isLogin="isLogin" />
      <div class="bg-gray-700 flex-grow overflow-auto p-7">
        <router-view />
      </div>
    </section>
    <Player />
  </main>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import storage from '@/models/storage';
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Player from '@/components/Player.vue';

export default {
  name: 'Index',
  components: {
    Header, SideBar, Player,
  },
  setup() {
    const store = useStore();
    const isLogin = ref(storage.get('userToken'));
    onBeforeMount(async () => {
      if (isLogin.value) {
        store.commit('login');
        await axios({
          method: 'get',
          url: 'https://api.sally-handmade.com/music/v1/user',
          headers: { Authorization: `Bearer ${storage.get('userToken')}` },
        }).then((res) => {
          store.commit('getUsername', res.data.data.name);
        }).catch((error) => {
          console.log(error);
        });
      }
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/music',
      }).then((res) => {
        console.log(res.data.data);
        store.commit('getSongList', res.data.data);
      }).catch((error) => {
        console.log(error);
      });
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/music-type',
      }).then((res) => {
        console.log(res.data.data);
        store.commit('getGenre', res.data.data);
      }).catch((error) => {
        console.log(error);
      });
    });
    return {
      isLogin,
    };
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 90px);
}
</style>
