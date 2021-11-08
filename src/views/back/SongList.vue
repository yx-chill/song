<template>
  <section>
    <table class="table-fixed w-full border-2 border-blue-600 shadow-lg mb-10">
      <thead>
        <tr class="text-center text-xl h-10 bg-blue-200">
          <th class="w-1/10">歌曲封面</th>
          <th class="w-1/2 text-left">歌曲名稱</th>
          <th class="w-1/5">歌手</th>
          <th class="w-1/10">編輯</th>
          <th class="w-1/10">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, i) in songs" :key="song.id"
          class="hover:bg-yellow-400 hover:text-gray-500 h-14"
          :class="{ 'bg-blue-300': i % 2 === 0, 'bg-blue-500': i % 2 === 1 }">
          <td class="text-center">{{ song.id }}</td>
          <td>{{ song.name }}</td>
          <td class="text-center">{{ song.composer }}</td>
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
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SongList',
  setup() {
    const store = useStore();
    const songs = computed(() => store.state.songList);
    return {
      songs,
    };
  },
};
</script>

<style scoped>
.w-1\/10 {
  width: 10%;
}
</style>
