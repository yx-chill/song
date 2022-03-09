<template>
  <section class="relative">
    <Loading v-if="loadingData.showLoading" :message="loadingData.loadingMsg" />
    <VeeForm @submit="addSong($event)" :validation-schema="songSchema"
    class="bg-green-200 bg-opacity-80 p-4 rounded">
      <div class="flex justify-between gap-3 mb-2">
        <div class="w-3/4">
          <div class="songnamegroup relative mb-3">
            <i class="fas fa-compact-disc absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="songname" placeholder="歌曲名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600 font-bold" name="songname" />
          </div>
          <div class="composergroup relative mb-3">
            <i class="fas fa-marker absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="composer" placeholder="作者名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600 font-bold" name="composer" />
          </div>
          <div class="typegroup relative mb-3">
            <i class="fas fa-headphones absolute top-2 left-3 text-xl"></i>
            <VeeField as="select" name="music_type_id" value="1"
              class="password h-10 px-10 text-xl block w-full rounded mb-1">
              <option v-for="genre in genres" :key="genre.id"
                :value="genre.id">{{ genre.name }}</option>
            </VeeField>
            <ErrorMessage class="text-red-600" name="genre" />
          </div>
          <UploadSong :isClean="isClean" @uploadSong="uploadSong" />
        </div>
        <div class="w-1/4">
          <UploadImg :isClean="isClean" @uploadImg="uploadImg" />
        </div>
      </div>
      <button type="submit" class="block w-full font-bold bg-green-600
        text-white py-1.5 px-3 rounded transition hover:bg-green-700">
        新增歌曲
      </button>
      <input type="reset" value="清除資料" ref="cleanData"
        class="fixed -top-10 opacity-0">
    </VeeForm>
  </section>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { get, post } from '@/includes/adminReq';
import UploadSong from '@/components/back/UploadSong.vue';
import UploadImg from '@/components/back/UploadImg.vue';
import Loading, { useLoading } from '@/components/Loading.vue';
import { successNotify, errorNotify } from '@/composables/useNotification';

const { loadingData, showLoading, hideLoading } = useLoading();

// 取得曲風
const handleGenres = () => {
  const genreData = reactive({ genres: [] });
  const getGenres = async () => {
    await get('v1/admin/music-type').then((res) => {
      genreData.genres = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
  };
  const { genres } = toRefs(genreData);
  return { genres, getGenres };
};

// 取得音樂檔
const handleUploadSong = () => {
  const songData = reactive({ file: [] });
  const uploadSong = (file) => {
    songData.file = file;
  };

  return { songData, uploadSong };
};

// 取得圖片檔
const handleUploadImg = () => {
  const imgData = reactive({ file: [] });
  const uploadImg = (file) => {
    imgData.file = file;
  };

  return { imgData, uploadImg };
};

// 新增歌曲
const handleAddSong = (songData, imgData) => {
  const cleanData = ref(null);
  const isClean = ref(false);
  const addSong = async (e) => {
    if (!songData.file) {
      errorNotify('尚未上傳歌曲');
      return;
    }
    showLoading('新增歌曲中...');
    const data = new FormData();
    data.append('name', e.songname);
    data.append('composer', e.composer);
    data.append('music_type_id', e.music_type_id);
    data.append('file', songData.file);
    if (imgData.file) {
      data.append('image', imgData.file);
    }
    await post('v1/admin/music', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      successNotify('新增成功');
    }).catch((err) => {
      console.log(err.response.data.errors);
    });
    isClean.value = !isClean.value;
    cleanData.value.click();
    hideLoading();
  };
  return { isClean, cleanData, addSong };
};

export default {
  name: 'AddSong',
  components: {
    UploadSong,
    UploadImg,
    Loading,
  },
  setup() {
    const songSchema = {
      songname: 'required|min:3|max:30',
      composer: 'required|min:3|max:30',
      music_type_id: 'required',
    };
    const { songData, uploadSong } = handleUploadSong();
    const { imgData, uploadImg } = handleUploadImg();
    const { genres, getGenres } = handleGenres();
    const { isClean, cleanData, addSong } = handleAddSong(songData, imgData);
    getGenres();
    return {
      genres, isClean, cleanData, uploadSong, uploadImg, addSong, songSchema, loadingData,
    };
  },
};
</script>
