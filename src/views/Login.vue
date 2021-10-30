<template>
  <main class="main overflow-hidden p-20">
    <LoginForm v-show="show === 'login'" @show-register="show = 'register'" />
    <RegisterForm v-show="show === 'register'" @show-login="show = 'login'" />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm, RegisterForm,
  },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', false));
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
