<template>
  <VeeForm :validation-schema="schema" @submit="register"
    class=" bg-purple-200 bg-opacity-80 p-4 rounded">
    <div class="emailgroup relative mb-3">
      <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
      <VeeField type="email" name="email" placeholder="電子郵件"
        class="h-10 pl-10 text-xl block w-full rounded" />
        <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="emailgroup relative mb-3">
      <i class="fas fa-signature absolute top-2 left-3 text-xl"></i>
      <VeeField type="text" name="username" placeholder="暱稱"
        class="h-10 pl-10 text-xl block w-full rounded" />
        <ErrorMessage class="text-red-600" name="username" />
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <VeeField type="password" name="password" placeholder="密碼"
        class="h-10 px-10 text-xl block w-full rounded" />
        <ErrorMessage class="text-red-600" name="password" />
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <VeeField type="password" name="password_confirmation" placeholder="確認密碼"
        class="h-10 px-10 text-xl block w-full rounded" />
        <ErrorMessage class="text-red-600" name="password_confirmation" />
    </div>
    <button type="submit" class="block w-full mb-3 font-bold
       bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
        註冊
    </button>
    <div class="pt-2 border-gray-400 border-t-2 text-center">
      <p class="font-bold mb-3">已有帳戶?</p>
      <button class="block w-full rounded-full border-2 py-1.5 font-bold"
        @click="$emit('show-login')">
        登入
      </button>
    </div>
  </VeeForm>
</template>

<script>
import { reactive } from 'vue';
import { post } from '@/includes/request';

export default {
  name: 'RegisterForm',
  setup() {
    const schema = reactive({
      username: 'required|min:3|max:10',
      email: 'required|min:3|max:50|email',
      password: 'required|min:6|max:32',
      password_confirmation: 'passwords_mismatch:@password',
    });
    const register = async (e) => {
      await post('/v1/register',
        {
          name: e.username,
          email: e.email,
          password: e.password,
          password_confirmation: e.password_confirmation,
        }).then((res) => {
        console.log(res.message);
        window.location.reload();
        console.log('123');
      }).catch((err) => {
        console.log(err.response);
        console.log('error');
      });
    };
    return {
      schema, register,
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
