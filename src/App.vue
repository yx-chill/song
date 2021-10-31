<template>
  <main class="main flex" v-show="showLayout">
    <SideBar />
    <section class="w-full flex flex-col">
      <Header />
      <div class="bg-gray-700 flex-grow overflow-auto p-7">
      <router-view />
      </div>
    </section>
  </main>
  <Player v-show="showLayout" />
  <router-view name="back" />
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
::-webkit-scrollbar {
  width: 8px;
  background: #374151;
}
::-webkit-scrollbar-thumb {
  background: #5a5a5a;
  border-radius: 8px;
}
.main {
  height: calc(100vh - 90px);
}
</style>
