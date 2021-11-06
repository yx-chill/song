<template>
  <div class="p-7">
    home
  </div>
  <button type="button" @click="btn">localStorage</button>
</template>

<script>
// @ is an alias to /src
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import storage from '@/models/storage';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('toggleLayoutShow', true));
    const btn = () => {
      storage.remove('a');
      console.log(window.localStorage);
    };
    return {
      btn,
    };
  },
};
</script>
