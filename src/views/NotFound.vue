<template>
  <div>404</div>
  {{ query }}
</template>

<script>
import { onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'NotFound',
  setup() {
    const route = useRoute();
    const store = useStore();
    const { query } = route.params;
    store.commit('toggleSearchShow');
    onBeforeUnmount(() => {
      store.commit('toggleSearchShow');
    });
    return { query };
  },
};
</script>

<style>

</style>
