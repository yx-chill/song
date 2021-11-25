<template>
  <div class="bg-green-300 border-green-500
   rounded-xl px-5 py-1 border-2 absolute left-1/2 mt-1">
    <p class="text-gray-600">{{ message }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'Toast',
  props: ['message'],
};

export const useToast = () => {
  const toastData = reactive({
    showToast: false,
    toastMsg: '',
  });
  const showToast = (message) => {
    toastData.showToast = true;
    toastData.toastMsg = message;
    setTimeout(() => {
      toastData.showToast = false;
      toastData.toastMsg = '';
    }, 2500);
  };
  return { toastData, showToast };
};
</script>

<style>

</style>
