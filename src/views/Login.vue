<template>
  <main class="main overflow-hidden p-20">
    <LoginForm v-show="show === 'login'" @show-register="show = 'register'" />
    <RegisterForm v-show="show === 'register'" @show-login="show = 'login'" />
    <div class=""></div>
  </main>
</template>

<script>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm, RegisterForm,
  },
  setup() {
    const show = ref('login');
    return {
      show,
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
