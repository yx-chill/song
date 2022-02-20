<template>
  <notifications>
    <template #body="{ item, close }">
      <div class="notification mx-4 mb-4 bg-white rounded-lg shadow-lg relative overflow-hidden"
        :class="`notification-${item.type || 'default'}`">
        <div class="notification-inner border-l-4 flex p-3">
          <i class="notification-icon far fa-check-circle" v-if="item.type === 'success'"></i>
          <i class="notification-icon fa fa-info-circle" v-else-if="item.type === 'warn'"></i>
          <i class="notification-icon far fa-times-circle" v-else-if="item.type === 'error'"></i>
          <i class="notification-icon fa fa-info-circle" v-else></i>
          <div class="ml-2">
            <div class="mt-1 text-gray-600 font-bold tracking-wider">{{ item.title }}</div>
            <div v-if="item.text" class="text-gray-400 text-sm mt-0.5">{{ item.text }}</div>
            <button type="button" class="absolute top-4 right-3 w-6 h-6 transition duration-500
              flex justify-center items-center text-gray-400 hover:text-black"
              :class="[item.text ? 'top-2' : 'top-4', times ? 'times' : '']"
              @click="close" @mouseover="enter" @mouseleave="out">
              <i class="fa fa-times text-xl"></i></button>
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const times = ref(false);
    const enter = () => {
      times.value = true;
    };
    const out = () => {
      times.value = false;
    };

    return { enter, out, times };
  },
};
</script>

<style scoped>
.times:hover {
  transform: rotate(180deg);
}
</style>
