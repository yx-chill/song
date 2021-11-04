<template>
  <section>
    <VeeForm @submit="addSong" :validation-schema="schema" :initial-values="userData"
    class="bg-green-200 bg-opacity-80 p-4 rounded">
      <div class="flex justify-between gap-3 mb-2">
        <div class="w-3/4">
          <div class="emailgroup relative mb-3">
            <i class="fas fa-compact-disc absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="songname" placeholder="歌曲名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600" name="songname" />
          </div>
          <div class="passwordgroup relative mb-3">
            <i class="fas fa-headphones absolute top-2 left-3 text-xl"></i>
            <!-- <i class="fas fa-sort-down absolute top-2 right-3 text-xl"></i> -->
            <VeeField as="select" name="genre"
              class="password h-10 px-10 text-xl block w-full rounded mb-1">
              <option v-for="genre in genres" :key="genre.id"
                :value="genre.id">{{ genre.name }}</option>
                <ErrorMessage class="text-red-600" name="genre" />
            </VeeField>
          </div>
          <UploadSong />
        </div>
        <div class="w-1/4">
          <UploadImg />
        </div>
      </div>
      <button
        type="submit"
        class=" block w-full font-bold bg-green-600
          text-white py-1.5 px-3 rounded transition hover:bg-green-700">
        新增歌曲
      </button>
    </VeeForm>
  </section>
</template>

<script>
import { useStore } from 'vuex';
import UploadSong from '@/components/back/UploadSong.vue';
import UploadImg from '@/components/back/UploadImg.vue';

export default {
  name: 'AddSong',
  components: {
    UploadSong,
    UploadImg,
  },
  setup() {
    const store = useStore();
    const schema = {
      songname: 'required|min:3|max:10|alpha_spaces',
      country: 'required',
    };
    const { genres } = store.state;
    const userData = {
      genre: '1',
    };
    const addSong = (e) => {
      console.log(e);
    };
    return {
      genres, addSong, schema, userData,
    };
  },
};
</script>

<style>
</style>
