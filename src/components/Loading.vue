<template>
<div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-800 opacity-80
      flex flex-col justify-center items-center z-10" v-if="showLoading">
      <p class="text-white text-2xl font-bold mb-10">{{ loadingMsg }}</p>
    <div class="la-line-scale-pulse-out la-2x">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { toRef } from 'vue';

export default {
  name: 'Loading',
  props: ['showLoading', 'loadingMsg'],
  setup(props) {
    const showLoading = toRef(props, 'showLoading');
    const loadingMsg = toRef(props, 'loadingMsg');
    // eslint-disable-next-line vue/no-dupe-keys
    return { showLoading, loadingMsg };
  },
};
</script>

<style scoped>
/*!
* Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
* Copyright 2015 Daniel Cardoso <@DanielCardoso>
* Licensed under MIT
*/
.la-line-scale-pulse-out,
.la-line-scale-pulse-out > div {
  position: relative;
  box-sizing: border-box;
}
.la-line-scale-pulse-out {
  display: block;
  font-size: 0;
  color: #fff;
}
.la-line-scale-pulse-out.la-dark {
  color: #333;
}
.la-line-scale-pulse-out > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}
.la-line-scale-pulse-out {
  width: 40px;
  height: 32px;
}
.la-line-scale-pulse-out > div {
  width: 4px;
  height: 32px;
  margin: 2px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0;
  animation: line-scale-pulse-out 0.9s infinite
    cubic-bezier(0.85, 0.25, 0.37, 0.85);
}
.la-line-scale-pulse-out > div:nth-child(3) {
  animation-delay: -0.9s;
}
.la-line-scale-pulse-out > div:nth-child(2),
.la-line-scale-pulse-out > div:nth-child(4) {
  animation-delay: -0.7s;
}
.la-line-scale-pulse-out > div:nth-child(1),
.la-line-scale-pulse-out > div:nth-child(5) {
  animation-delay: -0.5s;
}
.la-line-scale-pulse-out.la-sm {
  width: 20px;
  height: 16px;
}
.la-line-scale-pulse-out.la-sm > div {
  width: 2px;
  height: 16px;
  margin: 1px;
  margin-top: 0;
  margin-bottom: 0;
}
.la-line-scale-pulse-out.la-2x {
  width: 80px;
  height: 64px;
}
.la-line-scale-pulse-out.la-2x > div {
  width: 8px;
  height: 64px;
  margin: 4px;
  margin-top: 0;
  margin-bottom: 0;
}
.la-line-scale-pulse-out.la-3x {
  width: 120px;
  height: 96px;
}
.la-line-scale-pulse-out.la-3x > div {
  width: 12px;
  height: 96px;
  margin: 6px;
  margin-top: 0;
  margin-bottom: 0;
}
@keyframes line-scale-pulse-out {
  0% {
    transform: scaley(1);
  }
  50% {
    transform: scaley(0.3);
  }
  100% {
    transform: scaley(1);
  }
}
</style>
