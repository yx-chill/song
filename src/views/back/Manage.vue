<template>
  <main class="h-screen flex">
    <SideBar />
    <router-view class="p-5 w-full overflow-auto"></router-view>
  </main>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SideBar from '@/components/back/BackSideBar.vue';
import storage from '@/models/storage';

export default {
  name: 'Manage',
  components: {
    SideBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    onBeforeMount(async () => {
      store.dispatch('toggleLayoutShow', false);
      if (!storage.get('adminToken')) {
        router.push({ name: 'home' });
      }
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/admin/music',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        console.log(res.data);
        store.commit('getSongList', res.data.data);
      }).catch((error) => {
        console.log(error);
      });
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/admin/music-type',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        store.commit('getGenre', res.data.data);
      }).catch((error) => {
        console.log(error);
      });
    });
  },
};
</script>

<style>

</style>
