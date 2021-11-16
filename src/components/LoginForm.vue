<template>
  <div class="loginform bg-purple-200 bg-opacity-80 p-4 rounded">
    <VeeForm @submit="login">
      <div class="emailgroup relative mb-3">
        <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
        <VeeField type="email" name="email" placeholder="電子郵件"
          class="h-10 pl-10 text-xl block w-full rounded mb-1" v-model="email" />
      </div>
      <div class="passwordgroup relative mb-3">
        <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
        <i class="absolute top-2 right-3 text-xl cursor-pointer"
        :class="eye" @click="togglepwdtype"></i>
        <input type="password" name="password" ref="pwd" placeholder="密碼"
          class="password h-10 px-10 text-xl block w-full rounded mb-3" v-model="password" />
        <p class="text-white text-center bg-red-500 px-2 py-1 rounded"
          v-if="errMsg">{{ errMsg }}</p>
      </div>
      <button type="submit" class="block w-full mb-3 font-bold bg-purple-600
        text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="disabled">
          登入
      </button>
    </VeeForm>
    <div class="pt-2 border-gray-400 border-t-2 text-center">
      <p class="font-bold mb-3">未註冊帳戶?</p>
      <router-link class="block w-full rounded-full border-2 py-1.5 font-bold"
      :to="{ name: 'register' }">
        建立新帳號
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LoginForm',
  emits: ['login'],
  setup(_, { emit }) {
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
    const errMsg = ref('');
    const disabled = ref(false);
    const login = () => {
      errMsg.value = '';
      if (email.value.trim() !== '' && password.value.trim() !== '') {
        disabled.value = true;
        const data = { email: email.value, password: password.value };
        emit('login', data);
      } else {
        errMsg.value = '信箱或密碼不能為空';
      }
      password.value = '';
      disabled.value = false;
    };
    return {
      eye, togglepwdtype, pwd, login, email, password, errMsg, disabled,
    };
  },
};
</script>

<style scoped>
.loginform {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>
