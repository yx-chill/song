<template>
  <div class="grid grid-cols-10 gap-4 hover:bg-yellow-400 hover:text-gray-500 h-14"
    :class="{ 'bg-blue-300': i % 2 === 0, 'bg-blue-400': i % 2 === 1 }">
    <div class="flex">
      <div class="w-11 h-11 m-auto">
        <img :src="song.image ? song.image : 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png'" alt="song photo"
          class="w-full h-full">
      </div>
    </div>
    <div class="col-span-3 flex"><span class="m-auto">{{ song.name }}</span></div>
    <div class="col-span-2 flex"><span class="m-auto">{{ song.composer }}</span></div>
    <div class="flex"><span class="m-auto">{{ song.genre || song.music_type_id }}</span></div>
    <div class="flex">
      <span class="m-auto w-5 h-5 rounded-full"
        :class="song.status ? 'bg-green-600' : 'bg-red-600'"></span>
    </div>
    <div class="flex">
      <button class="py-1 px-2 rounded text-white bg-green-600 m-auto"
        @click.prevent="showEditForm = true">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div class="flex">
      <button class="py-1 px-2 rounded text-white bg-red-600 m-auto"
        @click.prevent="deleteSong(song.id)">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
  <!-- 編輯 -->
  <div v-show="showEditForm">
    <VeeForm @submit="editSong($event, song.id)"
      class="bg-green-300 flex items-center gap-4 py-2">
      <div class="text-center w-1/10">
        <div class="border mb-4 w-11 h-11 mx-auto">
          <img :src="preview ? preview : (song.image || 'http://www.davidguo.idv.tw/cube/images/SQ-1/SQ2.png')"
            alt="music photo" class="w-full h-full">
        </div>
        <VeeField type="file" name="image" accept="image/*" @change="previewImage($event)" />
      </div>
      <div class=" w-3/10">
        <div class="namegroup relative w-4/5 mx-auto">
          <i class="fas fa-file-signature absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="name" placeholder="歌曲名稱" :value="song.name"
            class="h-10 pl-10 w-full text-xl block rounded" />
        </div>
      </div>
      <div class="w-1/5">
        <div class="composergroup relative w-4/5 mx-auto">
          <i class="fas fa-microphone absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="composer" placeholder="歌手名稱" :value="song.composer"
            class="h-10 pl-10 w-full text-xl block rounded" />
        </div>
      </div>
      <div class="w-1/10">
        <VeeField as="select" name="music_type_id" :value="song.music_type_id"
          class="h-10 w-full text-xl block p-1 rounded">
          <option v-for="genre in genres" :key="genre.id"
            :value="genre.id">{{ genre.name }}</option>
        </VeeField>
        <ErrorMessage class="text-red-600" name="genre" />
      </div>
      <div class="text-center w-1/10">
        <p>狀態</p>
        <Switch v-model="enabled" :class='enabled ? "bg-green-400" : "bg-red-400"'
            class="relative inline-flex items-center h-6 transition-colors rounded-full w-11">
          <span :class='enabled ? "translate-x-6" : "translate-x-1"'
            class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full" />
        </Switch>
      </div>
      <div class="text-center w-1/10">
        <button type="submit" class="px-5 py-3 text-white font-bold rounded-lg
          bg-green-500 hover:bg-green-600">編輯</button>
      </div>
      <div class="text-center w-1/10">
        <button type="button" class="px-5 py-3 text-white font-bold rounded-lg
          bg-red-500 hover:bg-red-600" @click.prevent="hideEditForm">取消</button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import { ref, toRef } from 'vue';
import { Switch } from '@headlessui/vue';

export default {
  name: 'SongItem',
  components: { Switch },
  props: ['song', 'i', 'genres'],
  emits: ['editSong', 'deleteSong'],
  setup(props, { emit }) {
    const song = toRef(props, 'song');
    const i = toRef(props, 'i');
    const genres = toRef(props, 'genres');
    try {
      genres.value.forEach((item) => {
        if (item.id === +song.value.music_type_id) {
          song.value.genre = item.name;
        }
      });
    } catch (err) {
      console.log(err);
    }
    const showEditForm = ref(false);
    const enabled = ref(song.value.status);
    const hideEditForm = () => {
      showEditForm.value = false;
    };
    const preview = ref('');
    const previewImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        preview.value = event.target.result;
      });
    };
    const editSong = async (e, id) => {
      let statusCode = 1;
      if (!enabled.value) {
        statusCode = 0;
      }
      const data = new FormData();
      data.append('name', e.name);
      data.append('composer', e.composer);
      data.append('music_type_id', e.music_type_id);
      data.append('status', statusCode);
      data.append('_method', 'put');
      if (e.image) {
        data.append('image', e.image[0]);
        // eslint-disable-next-line prefer-destructuring
        song.value.image = e.image[0];
      }
      emit('editSong', id, data);
      song.value.name = e.name;
      song.value.composer = e.composer;
      song.value.music_type_id = e.music_type_id;
      song.value.status = enabled.value;
      showEditForm.value = false;
    };
    const deleteSong = (id) => {
      emit('deleteSong', id);
    };
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      song,
      // eslint-disable-next-line vue/no-dupe-keys
      i,
      // eslint-disable-next-line vue/no-dupe-keys
      genres,
      enabled,
      preview,
      previewImage,
      showEditForm,
      hideEditForm,
      editSong,
      deleteSong,
    };
  },
};
</script>

<style scoped>
.w-1\/10 {
  width: 10%;
}
.w-3\/10 {
  width: 30%;
}
</style>
