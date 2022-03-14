<template>
<section class="relative">
  <div class="container bg-red-400 mx-auto p-3 h-full flex flex-col">
    <VeeForm @submit="addGenre" :validation-schema="genreSchema"
      class="flex justify-center items-center gap-4 p-2 mb-3">
      <div class="w-2/4">
        <VeeField type="text" name="name" class="rounded w-full p-2 text-2xl"
          placeholder="輸入曲風名稱" />
          <ErrorMessage class="text-white font-bold" name="name" />
      </div>
      <div class="colorgroup relative w-20">
        <i class="fas fa-palette absolute top-2 left-3 text-xl"></i>
        <VeeField type="color" name="color" value='#FF0000'
          class="h-10 cursor-pointer w-full rounded pr-1 pl-10" />
      </div>
      <button type="submit"
        class="border border-white text-white px-5 py-2 text-xl rounded">
        新增</button>
        <input type="reset" value="清除" ref="resetBtn"
          class="fixed -top-10 opacity-0">
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
import { reactive, ref, toRefs } from 'vue';
import { post, get, del } from '@/includes/adminReq';
import GenreItem from '@/components/back/GenreItem.vue';
import { successNotify, errorNotify } from '@/composables/useNotification';
import { showLoading, hideLoading } from '@/composables/useLoading';

// 取得曲風
const handleGenres = () => {
  const genreData = reactive({ genres: [] });
  const getGenres = async () => {
    showLoading();
    try {
      const res = await get('v1/admin/music-type');
      genreData.genres = res.data.data;
    } catch (error) {
      console.log(error);
    }
    hideLoading();
  };
  return { genreData, getGenres };
};
// 新增曲風
const handleAddGenre = (genreData, resetBtn) => {
  const addGenre = async (data) => {
    showLoading('新增中...');
    try {
      const res = await post('v1/admin/music-type', data);
      genreData.genres.push(res.data.data);
      successNotify('新增成功');
    } catch (error) {
      errorNotify(error.response);
    }
    hideLoading();
    resetBtn.value.click();
  };
  return addGenre;
};
// 更新曲風
const handleEditGenre = () => {
  const editGenre = async (id, data) => {
    showLoading('新增中...');
    await post(`v1/admin/music-type/${id}`, data).then(() => {
      successNotify('編輯成功!');
    }).catch((err) => {
      errorNotify('Error', err.response.data.errors.name[0]);
    });
    hideLoading();
  };
  return editGenre;
};
// 刪除曲風
const handleDeleteGenre = (genreData) => {
  const deleteGenre = async (id) => {
    showLoading('刪除中...');
    await del(`v1/admin/music-type/${id}`).then(() => {
      genreData.genres.forEach((item, index) => {
        if (item.id === id) {
          genreData.genres.splice(index, 1);
        }
      });
      successNotify('刪除成功');
    }).catch((err) => {
      errorNotify('無法刪除', err.response.data.message);
    });
    hideLoading();
  };
  return deleteGenre;
};

export default {
  name: 'GenreList',
  components: { GenreItem },
  setup() {
    const resetBtn = ref(null);
    const genreSchema = { name: 'required' };
    const { genreData, getGenres } = handleGenres();
    const addGenre = handleAddGenre(genreData, resetBtn);
    const editGenre = handleEditGenre();
    const deleteGenre = handleDeleteGenre(genreData);
    getGenres();
    const { genres } = toRefs(genreData);
    // eslint-disable-next-line object-curly-newline
    return {
      genres, resetBtn, genreSchema, addGenre, editGenre, deleteGenre,
    };
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
