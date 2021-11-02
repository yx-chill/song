<template>
  <form @submit.prevent="login"
    class=" bg-purple-200 bg-opacity-80 p-4 rounded">
    <div class="emailgroup relative mb-3">
      <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
      <input type="email" name="email" placeholder="電子郵件"
        class="h-10 pl-10 text-xl block w-full rounded mb-1" v-model="email" />
      <p class="text-white text-center bg-red-500 px-2 py-1 rounded"></p>
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <i class="absolute top-2 right-3 text-xl cursor-pointer"
       :class="eye" @click="togglepwdtype"></i>
      <input type="password" name="password" ref="pwd" placeholder="密碼"
        class="password h-10 px-10 text-xl block w-full rounded mb-1" v-model="password">
      <p class="text-white text-center bg-red-500 px-2 py-1 rounded"></p>
    </div>
    <button type="submit" class="block w-full mb-3 font-bold bg-purple-600
      text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
        登入
    </button>
    <div class="pt-2 border-gray-400 border-t-2 text-center">
      <p class="font-bold mb-3">未註冊帳戶?</p>
      <button class="block w-full rounded-full border-2 py-1.5 font-bold"
        @click.prevent="$emit('show-register')">
        建立新帳號
      </button>
    </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { post } from '@/includes/request';

export default {
  name: 'LoginForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const pwd = ref(null);
    const eye = ref('fas fa-eye');
    const togglepwdtype = () => {
      if (eye.value === 'fas fa-eye') {
        eye.value = 'fas fa-eye-slash';
        pwd.value.type = 'text';
      } else {
        eye.value = 'fas fa-eye';
        pwd.value.type = 'password';
      }
    };
    const email = ref('');
    const password = ref('');
    const login = async () => {
      await post(
        '/v1/login',
        { email: email.value, password: password.value },
      ).then(async (res) => {
        await store.dispatch('login', { access: res.access_token, refresh: res.refresh_token });
        await store.dispatch('getUsername', { access: res.access_token });
        router.push({ name: 'home' });
      }).catch((err) => {
        console.log(err.response);
        console.log('error');
      });
    };
    return {
      eye, togglepwdtype, pwd, login, email, password,
    };
  },
};
</script>

<style>
form {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>
