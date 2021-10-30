<template>
  <div class=" p-7">
    search
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    store.commit('toggleSearchShow');
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    onMounted(() => store.dispatch('toggleLayoutShow', true));
    return {
    };
  },
};
</script>

<style>

</style>
