<template>
<section>
  <div class="container border border-yellow-600 bg-red-400 mx-auto p-3">
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
    <div class="border-2 border-yellow-600 shadow-lg mb-10">
      <div class="grid grid-cols-10 gap-4 h-14 text-white text-xl font-bold bg-yellow-600">
        <div class="flex p-1"><span class="m-auto">id</span></div>
        <div class="flex p-1 col-span-4"><span class="m-auto">曲風名稱</span></div>
        <div class="flex p-1 col-span-2"><span class="m-auto">背景顏色</span></div>
        <div class="flex p-1"><span class="m-auto">狀態</span></div>
        <div class="flex p-1"><span class="m-auto">編輯</span></div>
        <div class="flex p-1"><span class="m-auto">刪除</span></div>
      </div>
      <GenreItem v-for="(genre, i) in genres" :key="genre.id"
        :genre="genre" :i="i" @deleteGenre="deleteGenre" />
    </div>
  </div>
</section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import storage from '@/models/storage';
import GenreItem from '@/components/back/GenreItem.vue';

export default {
  name: 'GenreList',
  components: { GenreItem },
  setup() {
    const store = useStore();
    const genres = computed(() => store.state.genres);
    const genreSchema = {
      name: 'required',
    };
    const genreData = {
      color: '#FF0000',
    };
    console.log(genres);
    const addGenre = async (data) => {
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
    };
    const deleteGenre = async (id) => {
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
      console.log(id);
    };
    return {
      genres, addGenre, genreData, genreSchema, deleteGenre,
    };
  },
};
</script>

<style>
</style>
