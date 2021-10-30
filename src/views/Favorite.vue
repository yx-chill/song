<template>
  <div class="p-7">
    favorite
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Favorite',
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', true));
    return {
    };
  },
};
</script>

<style>

</style>
