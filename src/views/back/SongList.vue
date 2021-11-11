<template>
  <section>
    <div class="border-2 border-blue-600 shadow-lg mb-10">
      <div class="grid grid-cols-10 gap-4 h-14 text-white text-xl font-bold bg-blue-600">
        <div class="flex p-1"><span class="m-auto">歌曲封面</span></div>
        <div class="flex p-1 col-span-4"><span class="m-auto">歌曲名稱</span></div>
        <div class="flex p-1 col-span-2"><span class="m-auto">歌手</span></div>
        <div class="flex p-1"><span class="m-auto">狀態</span></div>
        <div class="flex p-1"><span class="m-auto">編輯</span></div>
        <div class="flex p-1"><span class="m-auto">刪除</span></div>
      </div>
      <SongItem v-for="(song, i) in songs" :key="song.id"
        :song="song" :i="i" />
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import SongItem from '@/components/back/SongItem.vue';

export default {
  name: 'SongList',
  components: {
    SongItem,
  },
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
