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
              <ErrorMessage class="text-red-600" name="songname" />
          </div>
          <div class="composergroup relative mb-3">
            <i class="fas fa-marker absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="composer" placeholder="作者名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600" name="composer" />
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
          <UploadSong @uploadSong="uploadSong" />
        </div>
        <div class="w-1/4">
          <UploadImg />
        </div>
      </div>
      <button type="submit" class="block w-full font-bold bg-green-600
        text-white py-1.5 px-3 rounded transition hover:bg-green-700">
        新增歌曲
      </button>
    </VeeForm>
  </section>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import storage from '@/models/storage';
import UploadSong from '@/components/back/UploadSong.vue';
import UploadImg from '@/components/back/UploadImg.vue';
import Loading, { useLoading } from '@/components/Loading.vue';

export default {
  name: 'AddSong',
  components: {
    UploadSong,
    UploadImg,
    Loading,
  },
  setup() {
    const songSchema = {
      songname: 'required|min:3|max:10|alpha_spaces',
      composer: 'required|min:3|max:10|alpha_spaces',
      music_type_id: 'required',
    };
    const { loadingData, showLoading, hideLoading } = useLoading();
    const genres = ref([]);
    onBeforeMount(async () => {
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
    let file = '';
    const uploadSong = (e) => {
      file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      if (file.type !== 'audio/mpeg') {
        console.log('請選擇音樂檔'); // TODO
        return;
      }
      console.log(file);
    };
    const addSong = async (e) => {
      showLoading('新增歌曲中...');
      const data = new FormData();
      data.append('name', e.songname);
      data.append('composer', e.composer);
      data.append('music_type_id', e.music_type_id);
      data.append('file', file);
      if (e.image) {
        data.append('image', e.image[0]);
      }
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/admin/music',
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
    return {
      genres, uploadSong, addSong, songSchema, loadingData,
    };
  },
};
</script>

<style>
</style>
