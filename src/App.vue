<template>
  <div class="main">
    <router-view />
  </div>
  <Player />
</template>

<script>
import Player from '@/components/Player.vue';

export default {
  name: 'App',
  components: {
    Player,
  },
};
</script>

<style class="scoped">
.main {
  height: calc(100vh - 90px);
}
</style>
