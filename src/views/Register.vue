<template>
  <main class="main overflow-hidden p-20 relative">
    <Loading v-if="loadingData.showLoading" :message="loadingData.loadingMsg" />
    <div class="registerform bg-purple-200 bg-opacity-80 p-4 rounded">
      <VeeForm :validation-schema="schema" @submit="register">
        <div class="emailgroup relative mb-3">
          <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
          <VeeField type="email" name="email" placeholder="電子郵件"
            class="h-10 pl-10 text-xl block w-full rounded" />
            <ErrorMessage class="text-red-600" name="email" />
        </div>
        <div class="namegroup relative mb-3">
          <i class="fas fa-signature absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="name" placeholder="暱稱"
            class="h-10 pl-10 text-xl block w-full rounded" />
            <ErrorMessage class="text-red-600" name="name" />
        </div>
        <div class="passwordgroup relative mb-3">
          <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
          <VeeField type="password" name="password" placeholder="密碼"
            class="h-10 px-10 text-xl block w-full rounded" />
            <ErrorMessage class="text-red-600" name="password" />
        </div>
        <div class="password_confirmationgroup relative mb-2">
          <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
          <VeeField type="password" name="password_confirmation" placeholder="確認密碼"
            class="h-10 px-10 text-xl block w-full rounded" />
            <ErrorMessage class="text-red-600" name="password_confirmation" />
        </div>
        <p class="text-white text-center bg-red-500 px-2 py-1 rounded mb-2"
            v-if="errMsg">{{ errMsg }}</p>
        <button type="submit" class="block w-full mb-3 font-bold
          bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
            註冊
        </button>
      </VeeForm>
      <div class="pt-2 border-gray-400 border-t-2 text-center">
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
import Loading, { useLoading } from '@/components/Loading.vue';

const schema = ({
  name: 'required|min:3|max:10',
  email: 'required|min:3|max:50|email',
  password: 'required|min:6|max:32',
  password_confirmation: 'passwords_mismatch:@password',
});

const { loadingData, showLoading, hideLoading } = useLoading();

// 註冊
const handleRegister = () => {
  const router = useRouter();
  const errMsg = ref('');
  const register = async (data) => {
    errMsg.value = '';
    showLoading('註冊中...');
    await axios({
      method: 'post',
      url: 'https://api.sally-handmade.com/music/v1/register',
      data,
    }).then((res) => {
      console.log(res.data.message);
      router.push({ name: 'login' });
    }).catch((err) => {
      errMsg.value = err.response.data.errors.email[0] || '';
    });
    hideLoading();
  };
  return { errMsg, register };
};

export default {
  name: 'Register',
  components: { Loading },
  setup() {
    const { errMsg, register } = handleRegister();
    // eslint-disable-next-line object-curly-newline
    return { register, schema, errMsg, loadingData };
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
