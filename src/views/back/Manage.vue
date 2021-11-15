<template>
  <main class="h-screen flex">
    <SideBar />
    <router-view class="p-5 w-full overflow-auto"></router-view>
  </main>
</template>

<script>
import { useRouter } from 'vue-router';
import SideBar from '@/components/back/BackSideBar.vue';
import storage from '@/models/storage';

export default {
  name: 'Manage',
  components: {
    SideBar,
  },
  setup() {
    const router = useRouter();
    if (!storage.get('adminToken')) {
      router.push({ name: 'home' });
    }
  },
};
</script>

<style>

</style>
