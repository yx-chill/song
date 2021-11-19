<template>
  {{ genre }}
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'Genre',
  setup() {
    const route = useRoute();
    const { genre } = route.params;
    return {
      genre,
    };
  },
};
</script>

<style>
</style>
