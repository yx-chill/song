<template>
  <section class="h-screen flex flex-col relative">
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
import { get, post, del } from '@/includes/adminReq';
import SongItem from '@/components/back/SongItem.vue';
import { successNotify, errorNotify } from '@/composables/useNotification';
import { showLoading, hideLoading } from '@/composables/useLoading';

// 取得音樂列表
const handleSongs = () => {
  const songList = reactive({ songs: [] });
  const getSongs = (async () => {
    showLoading();
    try {
      const res = await get('v1/admin/music');
      songList.songs = res.data.data;
    } catch (error) {
      console.log(error);
    }
    hideLoading();
  });

  return { songList, getSongs };
};
// 取得曲風
const handleGenres = () => {
  const genreList = reactive({ genres: [] });
  const getGenres = (async () => {
    try {
      const res = await get('v1/admin/music-type');
      genreList.genres = res.data.data;
    } catch (error) {
      console.log(error);
    }
  });
  const { genres } = toRefs(genreList);
  return { genres, getGenres };
};
// 編輯音樂
const handleEditSong = () => {
  const editSong = async (id, data) => {
    showLoading('更新中...');
    await post(`v1/admin/music/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      successNotify('編輯成功');
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
    showLoading('刪除中...');
    await del(`v1/admin/music/${id}`).then(() => {
      songList.songs.forEach((item, index) => {
        if (item.id === id) {
          songList.songs.splice(index, 1);
        }
      });
      successNotify('刪除成功');
    }).catch((err) => {
      errorNotify('無法刪除', err.response.data.message);
    });
    hideLoading();
  };
  return deleteSong;
};

export default {
  name: 'SongList',
  components: { SongItem },
  setup() {
    const { songList, getSongs } = handleSongs();
    const { genres, getGenres } = handleGenres();
    const editSong = handleEditSong();
    const deleteSong = handleDeleteSong(songList);
    getSongs();
    getGenres();
    const { songs } = toRefs(songList);

    return {
      songs, genres, editSong, deleteSong,
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
