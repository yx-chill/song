<template>
<section>
  <div class="container border border-yellow-600 bg-red-400 mx-auto p-3">
    <div class="flex justify-around mb-10">
      <input type="text" class="rounded w-1/2 p-2 text-2xl">
      <button class="border border-white text-white px-5 py-2 text-xl rounded">
        新增</button>
    </div>
    <table class="w-full border-2 border-yellow-600">
      <thead>
        <tr class="text-center text-xl h-10 bg-yellow-200">
          <th class="w-4/5">曲風</th>
          <th class="w-1/10">編輯</th>
          <th class="w-1/10">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(genre, i) in genres" :key="genre.id"
          class="hover:bg-blue-300 hover:text-gray-500 h-14"
          :class="{ 'bg-yellow-300': i % 2 === 0, 'bg-yellow-500': i % 2 === 1 }">
          <td class="text-center">{{ genre.name }}</td>
          <td class="text-center">
            <button class="py-1 px-2 rounded text-white bg-green-600">
              <i class="fa fa-pencil-alt"></i>
            </button>
          </td>
          <td class="text-center">
            <button class="py-1 px-2 rounded text-white bg-red-600">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'addGenre',
  setup() {
    const store = useStore();
    const genres = computed(() => store.state.genres);
    console.log(genres);
    return {
      genres,
    };
  },
};
</script>

<style>
</style>
