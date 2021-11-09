<template>
    <router-view />
</template>

<script>
export default {
  name: 'App',
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
