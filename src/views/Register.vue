<template>
<main class="main overflow-hidden p-20">
  <RegisterForm />
</main>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
  setup() {
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
