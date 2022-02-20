<template>
    <router-view />
    <AppNotifications />
</template>

<script>
import AppNotifications from '@/components/AppNotifications.vue';

export default {
  name: 'App',
  components: { AppNotifications },
  setup() {
    return {
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  background: #374151;
}
::-webkit-scrollbar-thumb {
  background: #5a5a5a;
  border-radius: 8px;
}
#nprogress .bar {
  background: red !important;
  height: 4px !important;
}
</style>
