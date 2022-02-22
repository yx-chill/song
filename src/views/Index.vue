<template>
  <main class="main flex">
    <SideBar :isLogin="isLogin" :username="username" @toLogin="toLogin" />
    <section class="w-full flex flex-col relative">
      <Header :isLogin="isLogin" @logout="logout" />
      <div class="bg-gray-700 flex-grow overflow-auto">
        <router-view />
      </div>
    </section>
    <Player />
  </main>
</template>

<script>
import { ref } from 'vue';
import storage from '@/models/storage';
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Player from '@/components/Player.vue';
import { successNotify, warningNotify } from '@/composables/useNotification';
import request, { get } from '@/includes/request';

export default {
  name: 'Index',
  components: {
    Header, SideBar, Player,
  },
  setup() {
    const isLogin = ref(storage.get('userToken'));
    const username = ref('');
    if (isLogin.value) {
      request('get', 'v1/user').then((res) => {
        username.value = res.data.data.name;
      }).catch((err) => {
        console.log(err);
      });
    }

    const toLogin = () => {
      warningNotify('請先登入');
    };

    const logout = async () => {
      await get('v1/logout').then(() => {
        window.location.reload();
        successNotify('登出成功');
      }).catch((err) => {
        console.log(err);
      });
      storage.remove('userToken');
      storage.remove('userRefreshToken');
    };

    return {
      isLogin, username, toLogin, logout,
    };
  },
};
</script>
a = a
<style scoped>
.main {
  height: calc(100vh - 90px);
}
</style>
