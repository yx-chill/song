<template>
<section class="relative">
  <Loading v-if="loadingData.showLoading" :message="loadingData.loadingMsg" />
  <div class="container bg-red-400 mx-auto p-3 h-full flex flex-col">
    <VeeForm @submit="addGenre" :validation-schema="genreSchema"
      :initial-values="genreData"
      class="flex justify-center items-center gap-4 p-2 mb-3">
      <div class="w-2/4">
        <VeeField type="text" name="name" class="rounded w-full p-2 text-2xl"
          placeholder="輸入曲風名稱" />
          <ErrorMessage class="text-white" name="name" />
      </div>
      <div class="colorgroup relative w-20">
        <i class="fas fa-palette absolute top-2 left-3 text-xl"></i>
        <VeeField type="color" name="color" class="h-10 cursor-pointer w-full rounded pr-1 pl-10" />
      </div>
      <button type="submit"
        class="border border-white text-white px-5 py-2 text-xl rounded">
        新增</button>
    </VeeForm>
    <div class="border-2 border-yellow-600 shadow-lg">
      <div class="grid grid-cols-10 gap-4 h-14 text-white text-xl font-bold bg-yellow-600">
        <div class="flex p-1"><span class="m-auto">id</span></div>
        <div class="flex p-1 col-span-4"><span class="m-auto">曲風名稱</span></div>
        <div class="flex p-1 col-span-2"><span class="m-auto">背景顏色</span></div>
        <div class="flex p-1"><span class="m-auto">狀態</span></div>
        <div class="flex p-1"><span class="m-auto">編輯</span></div>
        <div class="flex p-1"><span class="m-auto">刪除</span></div>
      </div>
    </div>
    <div class="h-full overflow-auto">
      <GenreItem v-for="(genre, i) in genres" :key="genre.id"
        :genre="genre" :i="i" @editGenre="editGenre" @deleteGenre="deleteGenre" />
    </div>
  </div>
</section>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import storage from '@/models/storage';
import GenreItem from '@/components/back/GenreItem.vue';
import Loading, { useLoading } from '../../components/Loading.vue';

export default {
  name: 'GenreList',
  components: { GenreItem, Loading },
  setup() {
    const { loadingData, showLoading, hideLoading } = useLoading();
    const genres = ref([]);
    const genreSchema = {
      name: 'required',
    };
    const genreData = {
      color: '#FF0000',
    };
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
    // 新增曲風
    const addGenre = async (data) => {
      showLoading('曲風新增中...');
      console.log(data);
      await axios({
        method: 'post',
        url: 'https://api.sally-handmade.com/music/v1/admin/music-type',
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
        data,
      }).then((res) => {
        genres.value.push(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
      hideLoading();
    };
    // 更新曲風
    const editGenre = async (id, data) => {
      showLoading('曲風更新中...');
      await axios({
        method: 'post',
        url: `https://api.sally-handmade.com/music/v1/admin/music-type/${id}`,
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
        data,
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      hideLoading();
    };
    // 刪除曲風
    const deleteGenre = async (id) => {
      showLoading('曲風刪除中...');
      await axios({
        method: 'delete',
        url: `https://api.sally-handmade.com/music/v1/admin/music-type/${id}`,
        headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
      }).then((res) => {
        console.log(res);
        genres.value.forEach((item, index) => {
          if (item.id === id) {
            genres.value.splice(index, 1);
          }
        });
      }).catch((err) => {
        console.log(err);
      });
      hideLoading();
    };
    return {
      genres,
      genreData,
      genreSchema,
      addGenre,
      editGenre,
      deleteGenre,
      loadingData,
    };
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
