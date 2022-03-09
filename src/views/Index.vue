<template>
  <main class="main flex">
    <SideBar :isLogin="isLogin" :username="username" @toLogin="toLogin" />
    <section class="w-full flex flex-col relative">
      <Header :isLogin="isLogin" :disable="disable" @logout="logout" />
      <div class="bg-gray-700 flex-grow overflow-auto">
        <router-view />
      </div>
    </section>
    <Player />
  </main>
</template>

<script>
import { ref } from 'vue';
import storage from '@/includes/storage';
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
    const disable = ref(false);
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
      disable.value = true;
      await get('v1/logout').then(() => {
        successNotify('登出成功');
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        storage.remove('userToken');
        storage.remove('userRefreshToken');
        window.location.reload();
        disable.value = false;
      });
    };

    return {
      isLogin, username, toLogin, logout, disable,
    };
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 90px);
}
</style>
