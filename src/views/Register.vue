<template>
  <main class="main overflow-hidden p-20 relative">
    <div class="registerform bg-purple-200 bg-opacity-80 p-4 rounded">
      <VeeForm :validation-schema="schema" @submit="register" class="space-y-3">
        <div class="emailgroup relative">
          <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
          <VeeField type="email" name="email" placeholder="電子郵件"
            class="h-10 pl-10 text-xl block w-full rounded mb-3" />
            <ErrorMessage class="text-red-600 font-bold" name="email" />
        </div>
        <div class="namegroup relative">
          <i class="fas fa-signature absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="name" placeholder="暱稱"
            class="h-10 pl-10 text-xl block w-full rounded mb-3" />
            <ErrorMessage class="text-red-600 font-bold" name="name" />
        </div>
        <div class="passwordgroup relative">
          <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
          <VeeField type="password" name="password" placeholder="密碼"
            class="h-10 px-10 text-xl block w-full rounded mb-3" />
            <ErrorMessage class="text-red-600 font-bold" name="password" />
        </div>
        <div class="password_confirmationgroup relative">
          <i class="fas fa-clipboard-check absolute top-2 left-3 text-xl"></i>
          <VeeField type="password" name="password_confirmation" placeholder="確認密碼"
            class="h-10 px-10 text-xl block w-full rounded mb-3" />
            <ErrorMessage class="text-red-600 font-bold" name="password_confirmation" />
        </div>
        <p class="text-white text-center bg-red-500 px-2 py-1 rounded mb-2"
            v-if="errMsg">{{ errMsg }}</p>
        <button type="submit" class="block w-full font-bold
          bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
            註冊
        </button>
      </VeeForm>
      <div class="mt-3 pt-2 border-gray-400 border-t-2 text-center">
        <p class="font-bold mb-3">已有帳戶?</p>
        <router-link class="block w-full rounded-full border-2 py-1.5 font-bold
          hover:bg-purple-200" :to="{ name: 'login' }">
          登入
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { successNotify } from '@/composables/useNotification';
import { showLoading, hideLoading } from '@/composables/useLoading';

const schema = ({
  name: 'required|min:3|max:10',
  email: 'required|min:3|max:50|email',
  password: 'required|min:6|max:32',
  password_confirmation: 'passwords_mismatch:@password',
});

// 註冊
const handleRegister = () => {
  const router = useRouter();
  const errMsg = ref('');
  const register = async (data) => {
    errMsg.value = '';
    showLoading('註冊中...');
    try {
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/register',
        data,
      });
      router.push({ name: 'login' }).then(() => successNotify('註冊成功'));
    } catch (error) {
      errMsg.value = error.response.data.errors.email[0] || '';
    }
    hideLoading();
  };
  return { errMsg, register };
};

export default {
  name: 'Register',
  setup() {
    const { errMsg, register } = handleRegister();
    // eslint-disable-next-line object-curly-newline
    return { register, schema, errMsg };
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  background: url('../assets/login-bg.jpg');
  background-position: bottom center;
}
.registerform {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>
