<template>
  <main class="main overflow-hidden p-20">
    <LoginForm @login="login" />
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/models/storage';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();
    const errMsg = ref('');
    const login = async (data) => {
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/login',
        data,
      }).then(async (res) => {
        storage.set('userToken', res.data.access_token);
        storage.set('userRefreshToken', res.data.refresh_token);
        router.push({ name: 'home' });
      }).catch((err) => {
        console.log(err.response.status);
        console.log('error');
        errMsg.value = '信箱或密碼有誤，請重新輸入!';
      });
    };
    return {
      login,
    };
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  background: url('../assets/login-bg.jpg');
  background-position: bottom center;
}
</style>
