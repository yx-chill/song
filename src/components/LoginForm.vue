<template>
  <VeeForm :validation-schema="schema" @submit="login"
    class=" bg-purple-200 bg-opacity-80 p-4 rounded">
    <div class="emailgroup relative mb-3">
      <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
      <VeeField type="email" name="email" placeholder="電子郵件"
        class="h-10 pl-10 text-xl block w-full rounded" v-model="email" />
        <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <i class="absolute top-2 right-3 text-xl cursor-pointer"
       :class="eye" @click="togglepwdtype"></i>
      <input type="password" name="password" ref="pwd" placeholder="密碼"
        class="password h-10 px-10 text-xl block w-full rounded" v-model="password">
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
    </VeeForm>
</template>

<script>
import { ref, reactive } from 'vue';
// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
// import axios from 'axios';
// import { post } from '@/includes/request';

export default {
  name: 'LoginForm',
  setup() {
    // const store = useStore();
    // const router = useRouter();
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
    const schema = reactive({
      email: 'required|min:3|max:50|email',
    });
    const email = ref('');
    const password = ref('');
    const login = () => {
      // post('/v1/login', {
      //   email: email.value,
      //   password: password.value,
      // }).then((response) => {
      //   console.log(response);
      // }).catch((error) => {
      //   console.log(error);
      // });
      // router.push({ name: 'home' });
      console.log({ email: email.value, password: password.value });
      fetch('https://api.sally-handmade.com/music/v1/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
        // body: `email=${email.value}&password=${password.value}`,
      }).then((response) => response.json())
        .then((myJson) => console.log(myJson))
        .catch((err) => console.log(err));
    };
    return {
      eye, togglepwdtype, pwd, login, schema, email, password,
    };
  },
};
// import { post } from '@/utils/request'
// const useLoginEffect = (showToast) => {
//   const router = useRouter()
//   const data = reactive({ username: '', password: '' })
//   const handleLogin = async (e) => {
//     try {
//       const result = await post('/api/user/login', {
//         username: data.username,
//         password: data.password
//       })
//       if (result.code === '0002') {
//         localStorage.isLogin = true
//         router.push({ name: 'Home' })
//       } else {
//         showToast('登入失敗')
//       }
//     } catch (e) {
//       showToast('請求失敗')
//     }
//   }
//   const { username, password } = toRefs(data)
//   return { username, password, handleLogin }
// }
</script>

<style>
form {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>
