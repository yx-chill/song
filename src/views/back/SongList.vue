<template>
  <section class="h-screen flex flex-col relative">
    <Loading :showLoading="showLoading" :loadingMsg="loadingMsg" />
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
        :song="song" :i="i" :genres="genres" @editSong="editSong" @deleteSong="deleteSong" />
    </div>
  </section>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import storage from '@/models/storage';
import SongItem from '@/components/back/SongItem.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'SongList',
  components: {
    SongItem, Loading,
  },
  setup() {
    const songs = ref([]);
    const genres = ref([]);
    const showLoading = ref(false);
    const loadingMsg = ref('測試測試...');
    onBeforeMount(async () => {
      // 取得歌曲列表
      await axios({
        method: 'get',
        url: 'https://api.sally-handmade.com/music/v1/admin/music',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        songs.value = res.data.data;
      }).catch((error) => {
        console.log(error);
      });
      // 取得曲風
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
    // 更新歌曲
    const editSong = async (id, data) => {
      showLoading.value = true;
      loadingMsg.value = '歌曲更新中...';
      await axios({
        method: 'post',
        url: `https://api.sally-handmade.com/music/v1/admin/music/${id}`,
        headers: {
          Authorization: `Bearer ${storage.get('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
        data,
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
      });
      showLoading.value = false;
      loadingMsg.value = '';
    };
    // 刪除歌曲
    const deleteSong = async (id) => {
      showLoading.value = true;
      loadingMsg.value = '歌曲刪除中...';
      await axios({
        method: 'delete',
        url: `https://api.sally-handmade.com/music/v1/admin/music/${id}`,
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        console.log(res);
        songs.value.forEach((item, index) => {
          if (item.id === id) {
            songs.value.splice(index, 1);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
      showLoading.value = false;
      loadingMsg.value = '';
    };
    return {
      songs, deleteSong, genres, showLoading, loadingMsg, editSong,
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
