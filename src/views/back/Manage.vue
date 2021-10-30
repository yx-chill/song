<template>
  <main class="main overflow-hidden p-20">
    <form @submit="login"
    class=" bg-blue-200 bg-opacity-80 p-4 rounded">
    <div class="emailgroup relative mb-3">
      <i class="fas fa-user absolute top-2 left-3 text-xl"></i>
      <input type="email" name="" placeholder="管理者帳號"
        class="h-10 pl-10 text-xl block w-full rounded">
    </div>
    <div class="passwordgroup relative mb-3">
      <i class="fas fa-lock absolute top-2 left-3 text-xl"></i>
      <input type="password" name="password" ref="pwd" placeholder="密碼"
        class="password h-10 px-10 text-xl block w-full rounded">
    </div>
    <button type="submit" class="block w-full mb-3 font-bold bg-blue-600
      text-white py-1.5 px-3 rounded transition hover:bg-blue-700">
        登入
    </button>
    </form>
  </main>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Manage',
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', false));
    return {
    };
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  background: url('../../assets/login-bg.jpg');
  background-position: bottom center;
}
form {
  width: 450px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgb(0, 0, 0, .1), 0 8px 16px rgb(0, 0, 0, .1);
}
</style>
