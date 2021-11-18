<template>
  <main class="main overflow-hidden p-20 relative">
    <Loading v-if="loadingData.showLoading" :message="loadingData.loadingMsg" />
    <form @submit.prevent="adminLogin"
      class="bg-blue-200 bg-opacity-80 p-4 rounded">
      <div class="emailgroup relative mb-3">
        <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
        <input type="email" name="email" placeholder="管理者帳號"
          class="h-10 pl-10 text-xl block w-full rounded" v-model="email">
      </div>
      <div class="passwordgroup relative mb-2">
        <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
        <input type="password" name="password" ref="pwd" placeholder="密碼"
          class="password h-10 px-10 text-xl block w-full rounded" v-model="password">
      </div>
      <p class="text-white text-center bg-red-500 px-2 py-1 rounded mb-2"
          v-if="errMsg">{{ errMsg }}</p>
      <button type="submit" class="block w-full mb-3 font-bold bg-blue-600
        text-white py-1.5 px-3 rounded transition hover:bg-blue-700">
          登入
      </button>
    </form>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';
import Loading, { useLoading } from '@/components/Loading.vue';

const { loadingData, showLoading, hideLoading } = useLoading();
// 後台登入
const handleAdminLogin = () => {
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const errMsg = ref('');
  const adminLogin = async () => {
    const data = { email: email.value, password: password.value };
    if (data.email.trim() !== '' && data.password.trim() !== '') {
      errMsg.value = '';
      showLoading('登入中...');
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/admin/login',
        data,
      }).then((res) => {
        storage.set('adminToken', res.data.access_token);
        storage.set('adminRefresh', res.data.refresh_token);
        router.push({ name: 'manage' });
      }).catch((err) => {
        console.log(err.response);
        password.value = '';
        errMsg.value = '帳號或密碼有誤，請重新輸入!';
      });
    } else {
      password.value = '';
      errMsg.value = '帳號或密碼不能為空!';
    }
    hideLoading();
  };
  // eslint-disable-next-line object-curly-newline
  return { email, password, errMsg, adminLogin };
};

export default {
  name: 'Admin',
  components: { Loading },
  setup() {
    // eslint-disable-next-line object-curly-newline
    const { email, password, errMsg, adminLogin } = handleAdminLogin();
    return {
      adminLogin, email, password, errMsg, loadingData,
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
