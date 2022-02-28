<template>
  <section class="bg-black opacity-80 p-2 rounded" @click.capture="showSetting(true)">
    <h2 class="text-xl font-bold">快轉秒數</h2>
    <div class="space-y-1">
      <div class="flex items-center rounded p-1
        hover:bg-gray-200 hover:bg-opacity-40" @click="showSetting(false)">
        <label class="block w-full cursor-pointer" for="five">
          <input type="radio" value="five" id="five" v-model="selected" />
          5秒</label>
      </div>
      <div class="flex items-center rounded p-1
        hover:bg-gray-200 hover:bg-opacity-40" @click="showSetting(false)">
        <label class="block w-full cursor-pointer" for="ten">
          <input type="radio" value="ten" id="ten" v-model="selected" />
          10秒</label>
      </div>
      <div class="flex items-center rounded p-1
        hover:bg-gray-200 hover:bg-opacity-40" @click="showSetting(false)">
        <label class="block w-full cursor-pointer" for="fifteen">
          <input type="radio" value="fifteen" id="fifteen" v-model="selected" />
          15秒</label>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import storage from '@/models/storage';

export default {
  name: 'Setting',
  emits: ['showSetting'],
  setup(_, { emit }) {
    const store = useStore();
    const selected = ref(storage.get('fastwindSec') || 'five');
    watch(selected, (newSec) => {
      store.commit('setFastwindSec', newSec);
      storage.set('fastwindSec', newSec);
    });

    const showSetting = (e) => {
      emit('showSetting', e);
    };

    return { selected, showSetting };
  },
};
</script>

<style>

</style>
