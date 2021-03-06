<template>
  <div class="grid grid-cols-10 gap-4 hover:bg-yellow-400 hover:text-gray-500 h-14"
    :class="i % 2 === 0 ? 'bg-blue-300' : 'bg-blue-400'">
    <div class="flex">
      <div class="w-11 h-11 m-auto">
        <img :src="preview || song.image || require('@/assets/headphone.jpg')" alt="song photo"
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
        @click.prevent="showEditForm = !showEditForm">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div class="flex">
      <button class="py-1 px-2 rounded text-white bg-red-600 m-auto"
        @click.prevent="deleteSong(song.id)">
        <!-- deleteSong(song.id) -->
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
  <!-- 編輯 -->
  <div v-show="showEditForm">
    <VeeForm :validation-schema="songSchema" @submit="editSong($event, song.id)"
      class="bg-green-300 flex items-center gap-4 py-2">
      <div class="text-center w-1/6 overflow-ellipsis">
        <VeeField type="file" name="image" accept="image/*" @change="previewImage($event)"
          class="w-full overflow-ellipsis" />
      </div>
      <div class="w-1/4">
        <div class="namegroup relative w-4/5 mx-auto">
          <i class="fas fa-file-signature absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="name" placeholder="歌曲名稱" :value="song.name"
            class="h-10 pl-10 w-full text-xl block rounded" />
            <ErrorMessage class="text-red-600" name="name" />
        </div>
      </div>
      <div class="w-1/5">
        <div class="composergroup relative w-4/5 mx-auto">
          <i class="fas fa-microphone absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="composer" placeholder="歌手名稱" :value="song.composer"
            class="h-10 pl-10 w-full text-xl block rounded" />
            <ErrorMessage class="text-red-600" name="composer" />
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
          bg-red-500 hover:bg-red-600" @click.prevent="showEditForm = false">取消</button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import {
  ref, toRef, reactive, watch,
} from 'vue';
import { Switch } from '@headlessui/vue';
import { useConfirm } from '@/composables/useConfirmModal';

const songSchema = reactive({
  name: 'required|min:3|max:20',
  composer: 'required|min:3|max:20',
});

export default {
  name: 'SongItem',
  components: { Switch },
  props: ['song', 'i', 'genres'],
  emits: ['editSong', 'deleteSong'],
  setup(props, { emit }) {
    const song = toRef(props, 'song');
    const i = toRef(props, 'i');
    const genres = toRef(props, 'genres');
    genres.value.forEach((item) => {
      if (item.id === +song.value.music_type_id) {
        song.value.genre = item.name;
      }
    });
    const showEditForm = ref(false);
    const enabled = ref(song.value.status);
    const preview = ref('');
    const previewImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        preview.value = event.target.result;
      });
    };

    watch(showEditForm, (newVal) => {
      if (!newVal) preview.value = '';
    });

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
        [song.value.image] = e.image;
      }
      emit('editSong', id, data);
      song.value.name = e.name;
      song.value.composer = e.composer;
      song.value.music_type_id = e.music_type_id;
      song.value.status = enabled.value;
      showEditForm.value = false;
    };

    const deleteSong = (id) => {
      useConfirm().then((result) => {
        if (result) {
          emit('deleteSong', id);
        }
      });
    };

    return {
      songSchema,
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
