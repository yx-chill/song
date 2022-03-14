<template>
  <main class="main overflow-hidden p-20 relative">
    <div class="loginform bg-purple-200 bg-opacity-80 p-4 rounded">
      <VeeForm :validation-schema="loginSchema" @submit="login($event)" class="space-y-3">
        <div class="emailgroup relative mb-3">
          <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
          <VeeField type="email" name="email" placeholder="電子郵件" value="guest@gmail.com"
            class="h-10 pl-10 text-xl block w-full rounded mb-1" />
            <ErrorMessage class="text-red-500 font-bold" name="email" />
        </div>
        <div class="passwordgroup relative">
          <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
          <i class="absolute top-2 right-3 text-xl cursor-pointer"
          :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'" @click="toggleType"></i>
          <input type="password" name="password" placeholder="密碼" ref="pwd"
            class="password h-10 px-10 text-xl block w-full rounded mb-2" v-model="password" />
          <p class="text-white text-center bg-red-500 px-2 py-1 rounded "
            v-if="errMsg">{{ errMsg }}</p>
        </div>
        <button type="submit" class="block w-full font-bold bg-purple-600
          text-white py-1.5 px-3  rounded transition hover:bg-purple-700"
          :disabled="disabled">
            登入
        </button>
      </VeeForm>
      <div class="mt-3 pt-2 border-gray-400 border-t-2 text-center">
        <p class="font-bold mb-3">未註冊帳戶?</p>
        <router-link class="block w-full rounded-full border-2 py-1.5 font-bold
          hover:bg-purple-200" :to="{ name: 'register' }">
          建立新帳號
        </router-link>
      </div>
  </div>
  </main>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import storage from '@/includes/storage';
import { successNotify } from '@/composables/useNotification';
import { showLoading, hideLoading } from '@/composables/useLoading';

const loginSchema = { email: 'required|min:3|max:50|email' };

// 切換密碼欄type
const handlePwdType = () => {
  const pwd = ref(null);
  const showPwd = ref(false);
  const toggleType = () => {
    if (!showPwd.value) {
      pwd.value.type = 'text';
    } else {
      pwd.value.type = 'password';
    }
    showPwd.value = !showPwd.value;
  };
  return { pwd, showPwd, toggleType };
};

// 登入
const handleLogin = () => {
  const router = useRouter();
  const data = reactive({ email: '', password: '' });
  const errMsg = ref('');
  const disabled = ref(false);
  const password = ref('guestguest');
  const login = async (e) => {
    data.email = e.email;
    data.password = password.value;
    errMsg.value = '';
    if (data.email.trim() !== '' && data.password.trim() !== '') {
      disabled.value = true;
      showLoading('登入中...');
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/login',
        data,
      }).then(async (res) => {
        await storage.set('userToken', res.data.access_token);
        await storage.set('userRefreshToken', res.data.refresh_token);
        router.push({ name: 'home' }).then(() => successNotify('登入成功'));
      }).catch((err) => {
        console.log(err.response.status);
        password.value = '';
        errMsg.value = '信箱或密碼有誤，請重新輸入!';
      });
    } else {
      password.value = '';
      errMsg.value = '信箱或密碼不能為空';
    }
    disabled.value = false;
    hideLoading();
  };
  // eslint-disable-next-line object-curly-newline
  return { errMsg, disabled, password, login };
};

export default {
  name: 'Login',
  setup() {
    const { pwd, showPwd, toggleType } = handlePwdType();
    // eslint-disable-next-line object-curly-newline
    const { errMsg, disabled, password, login } = handleLogin();
    return {
      loginSchema, pwd, showPwd, toggleType, errMsg, disabled, password, login,
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
.loginform {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>
