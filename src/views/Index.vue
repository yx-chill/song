<template>
  <main class="main flex">
    <SideBar :isLogin="isLogin" :username="username" />
    <section class="w-full flex flex-col">
      <Header :isLogin="isLogin" />
      <div class="bg-gray-700 flex-grow overflow-auto">
        <router-view />
      </div>
    </section>
    <Player />
  </main>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
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
    const isLogin = ref(storage.get('userToken'));
    const username = ref('');
    onBeforeMount(async () => {
      if (isLogin.value) {
        await axios({
          method: 'get',
          url: 'https://api.sally-handmade.com/music/v1/user',
          headers: { Authorization: `Bearer ${storage.get('userToken')}` },
        }).then((res) => {
          username.value = res.data.data.name;
        }).catch((error) => {
          console.log(error);
        });
      }
    });
    return {
      isLogin, username,
    };
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 90px);
}
</style>
