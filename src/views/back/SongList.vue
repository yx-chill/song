<template>
  <section class="h-screen flex flex-col">
    <div class="border-2 border-blue-600 shadow-lg">
      <div class="grid grid-cols-10 gap-4 h-14 text-white text-xl font-bold bg-blue-600">
        <div class="flex p-1"><span class="m-auto">歌曲封面</span></div>
        <div class="flex p-1 col-span-3"><span class="m-auto">歌曲名稱</span></div>
        <div class="flex p-1 col-span-2"><span class="m-auto">歌手</span></div>
        <div class="flex p-1"><span class="m-auto">曲風</span></div>
        <div class="flex p-1"><span class="m-auto">狀態</span></div>
        <div class="flex p-1"><span class="m-auto">編輯</span></div>
        <div class="flex p-1"><span class="m-auto">刪除</span></div>
      </div>
    </div>
    <div class="overflow-auto">
      <SongItem v-for="(song, i) in songs" :key="song.id"
        :song="song" :i="i" :genres="genres" @deleteSong="deleteSong" />
    </div>
  </section>
</template>

<script>
import { ref, onBeforeMount, inject } from 'vue';
import axios from 'axios';
import storage from '@/models/storage';
import SongItem from '@/components/back/SongItem.vue';

export default {
  name: 'SongList',
  components: {
    SongItem,
  },
  setup() {
    const reload = inject('reload');
    const songs = ref([]);
    const genres = ref([]);
    onBeforeMount(async () => {
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/admin/music',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        songs.value = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/admin/music-type',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        genres.value = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
    });
    const deleteSong = async (id) => {
      await axios({
        method: 'delete',
        url: `https://api.sally-handmade.com/music/v1/admin/music/${id}`,
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        console.log(res);
        reload();
      }).catch((err) => {
        console.log(err);
      });
      console.log(id);
    };
    return {
      songs, deleteSong, genres,
    };
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
.w-1\/10 {
  width: 10%;
}
</style>
