<template>
  <main class="main flex">
    <SideBar v-show="showLayout" />
    <section class="w-full">
      <Header v-show="showLayout" />
        <router-view />
    </section>
  </main>
  <Player v-show="showLayout" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Player from '@/components/Player.vue';

export default {
  name: 'App',
  components: {
    Header, SideBar, Player,
  },
  setup() {
    const store = useStore();
    const showLayout = computed(() => store.state.showLayout);
    return {
      showLayout,
    };
  },
};
</script>

<style class="scoped">
.main {
  height: calc(100vh - 90px);
}
</style>
