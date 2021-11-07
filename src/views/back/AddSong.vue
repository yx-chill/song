<template>
  <section>
    <VeeForm @submit="addSong($event)" :validation-schema="songSchema" :initial-values="songData"
    class="bg-green-200 bg-opacity-80 p-4 rounded">
      <div class="flex justify-between gap-3 mb-2">
        <div class="w-3/4">
          <div class="emailgroup relative mb-3">
            <i class="fas fa-compact-disc absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="songname" placeholder="歌曲名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600" name="songname" />
          </div>
          <div class="emailgroup relative mb-3">
            <i class="fas fa-marker absolute top-2 left-3 text-xl"></i>
            <VeeField type="text" name="composer" placeholder="作者名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
              <ErrorMessage class="text-red-600" name="composer" />
          </div>
          <div class="passwordgroup relative mb-3">
            <i class="fas fa-headphones absolute top-2 left-3 text-xl"></i>
            <!-- <i class="fas fa-sort-down absolute top-2 right-3 text-xl"></i> -->
            <VeeField as="select" name="music_type_id"
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
      <button type="submit" class="block w-full font-bold bg-green-600
        text-white py-1.5 px-3 rounded transition hover:bg-green-700">
        新增歌曲
      </button>
    </VeeForm>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import storage from '@/models/storage';
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
    const songSchema = {
      songname: 'required|min:3|max:10|alpha_spaces',
      composer: 'required|min:3|max:10|alpha_spaces',
      music_type_id: 'required',
    };
    const songData = {
      genre: '1',
    };
    const genres = computed(() => store.state.genres);
    const addSong = async (e) => {
      console.log(e);
      // const data = e;
      // // eslint-disable-next-line prefer-destructuring
      // data.file = e.file[0];
      // // eslint-disable-next-line prefer-destructuring
      // data.image = e.image[0];
      console.log(e.file[0]);
      console.log(e.image[0]);
      const data = new FormData();
      data.append('music_type_id', e.music_type_id);
      data.append('composer', e.composer);
      data.append('name', e.songname);
      data.append('file', e.file[0]);
      if (e.image) {
        data.append('image', e.image[0]);
      }

      console.log(data);
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
    };
    return {
      genres, addSong, songSchema, songData,
    };
  },
};
</script>

<style>
</style>
