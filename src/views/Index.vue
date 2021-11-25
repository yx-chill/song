<template>
  <main class="main flex">
    <SideBar :isLogin="isLogin" :username="username" @toLogin="toLogin" />
    <section class="w-full flex flex-col relative">
      <Toast v-if="toastData.showToast" :message="toastData.toastMsg" />
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
import Toast, { useToast } from '@/components/Toast.vue';

const { toastData, showToast } = useToast();

export default {
  name: 'Index',
  components: {
    Header, SideBar, Player, Toast,
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
    const toLogin = () => {
      showToast('請先登入');
    };
    return {
      isLogin, username, toastData, toLogin,
    };
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 90px);
}
</style>
