<template>
  <section class="h-screen flex flex-col relative">
    <Loading v-if="loadingData.showLoading" :message="loadingData.loadingMsg" />
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
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import storage from '@/models/storage';
import SongItem from '@/components/back/SongItem.vue';
import Loading, { useLoading } from '@/components/Loading.vue';

const { loadingData, showLoading, hideLoading } = useLoading();
// 取得音樂
const handleSongs = () => {
  const songList = reactive({ songs: [] });
  const getSongs = (async () => {
    await axios({
      method: 'get',
      url: 'https://api.sally-handmade.com/music/v1/admin/music',
      headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
    }).then((res) => {
      songList.songs = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  });
  return { songList, getSongs };
};
// 取得曲風
const handleGenres = () => {
  const genreList = reactive({ genres: [] });
  const getGenres = (async () => {
    await axios({
      method: 'get',
      url: 'https://api.sally-handmade.com/music/v1/admin/music-type',
      headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
    }).then((res) => {
      genreList.genres = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  });
  const { genres } = toRefs(genreList);
  return { genres, getGenres };
};
// 編輯音樂
const handleEditSong = () => {
  const editSong = async (id, data) => {
    showLoading('歌曲更新中...');
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
    hideLoading();
  };
  return editSong;
};
// 刪除音樂
const handleDeleteSong = (songList) => {
  const deleteSong = async (id) => {
    showLoading('歌曲刪除中...');
    await axios({
      method: 'delete',
      url: `https://api.sally-handmade.com/music/v1/admin/music/${id}`,
      headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
    }).then((res) => {
      console.log(res);
      songList.songs.forEach((item, index) => {
        if (item.id === id) {
          songList.songs.splice(index, 1);
        }
      });
    }).catch((err) => {
      console.log(err);
    });
    hideLoading();
  };
  return deleteSong;
};

export default {
  name: 'SongList',
  components: {
    SongItem, Loading,
  },
  setup() {
    const { songList, getSongs } = handleSongs();
    const { genres, getGenres } = handleGenres();
    const editSong = handleEditSong();
    const deleteSong = handleDeleteSong(songList);
    getSongs();
    getGenres();
    const { songs } = toRefs(songList);
    return {
      loadingData, songs, genres, editSong, deleteSong,
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
