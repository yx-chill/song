<template>
  {{ genre }}
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'Type',
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
