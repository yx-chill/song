<template>
  <main class="main overflow-hidden p-20">
    <form @submit.prevent="adminLogin"
    class="bg-blue-200 bg-opacity-80 p-4 rounded">
    <div class="emailgroup relative mb-3">
      <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
      <input type="email" name="email" placeholder="管理者帳號"
        class="h-10 pl-10 text-xl block w-full rounded" v-model="email">
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <input type="password" name="password" ref="pwd" placeholder="密碼"
        class="password h-10 px-10 text-xl block w-full rounded" v-model="password">
    </div>
    <button type="submit" class="block w-full mb-3 font-bold bg-blue-600
      text-white py-1.5 px-3 rounded transition hover:bg-blue-700">
        登入
    </button>
    </form>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';

export default {
  name: 'Admin',
  setup() {
    const router = useRouter();
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', false));
    const email = ref('');
    const password = ref('');
    const adminLogin = async () => {
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/admin/login',
        data: { email: email.value, password: password.value },
      }).then((res) => {
        storage.set('adminToken', res.data.access_token);
        storage.set('adminRefresh', res.data.refresh_token);
        router.push({ name: 'manage' });
      }).catch((err) => {
        console.log(err.response);
        console.log('error');
      });
    };
    return {
      adminLogin, email, password,
    };
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  background: url('../../assets/login-bg.jpg');
  background-position: bottom center;
}
form {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0, 0, 0, .1), 0 8px 16px rgb(0, 0, 0, .1);
}
</style>
