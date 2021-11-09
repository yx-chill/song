<template>
<main class="main overflow-hidden p-20">
  <RegisterForm @toLogin="toLogin"/>
</main>
</template>

<script>
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
  setup() {
    const router = useRouter();
    const toLogin = () => router.push({ name: 'login' });
    return {
      toLogin,
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
