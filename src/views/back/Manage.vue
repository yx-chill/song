<template>
  <main class="h-screen flex">
    <SideBar />
    <router-view class="p-5 w-full overflow-auto"></router-view>
  </main>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import SideBar from '@/components/back/BackSideBar.vue';

export default {
  name: 'Manage',
  components: {
    SideBar,
  },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', false));
  },
};
</script>

<style>

</style>
