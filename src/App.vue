<template>
    <router-view />
    <Loading v-model="show" :message="msg" />
    <AppNotifications />
</template>

<script>
import AppNotifications from '@/components/AppNotifications.vue';
import Loading from '@/components/Loading.vue';
import { useLoad } from '@/composables/useLoading';

export default {
  name: 'App',
  components: { AppNotifications, Loading },
  setup() {
    return { ...useLoad() };
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
