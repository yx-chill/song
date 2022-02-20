<template>
  <div class="grid grid-cols-10 gap-4 hover:bg-blue-400 h-14"
    :class="{ 'bg-yellow-300': i % 2 === 0, 'bg-yellow-400': i % 2 === 1 }">
    <div class="flex"><span class="m-auto">{{ genre.id }}</span></div>
    <div class="col-span-4 flex"><span class="m-auto">{{ genre.name }}</span></div>
    <div class="col-span-2 flex">
      <span class="m-auto w-10 h-10 rounded" :title="genre.color"
        :style="{'background-color': genre.color }"></span>
    </div>
    <div class="flex">
      <span class="m-auto w-5 h-5 rounded-full"
        :class="genre.status ? 'bg-green-600' : 'bg-red-600'"></span></div>
    <div class="flex">
      <button class="py-1 px-2 rounded text-white bg-green-600 m-auto"
        @click.prevent="editForm = !editForm">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div class="flex">
      <button class="py-1 px-2 rounded text-white bg-red-600 m-auto"
        @click.prevent="deleteGenre(genre.id)">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
  <!-- 編輯 -->
  <div v-show="editForm">
    <VeeForm :initial-values="genre" @submit="editGenre($event, genre.id)"
      class="bg-green-300 flex items-center gap-4 py-2">
      <div class="text-center w-1/10">
      </div>
      <div class="w-2/5">
        <div class="namegroup relative w-4/5 mx-auto">
          <i class="fas fa-file-signature absolute top-2 left-3 text-xl"></i>
          <VeeField type="text" name="name" placeholder="曲風名稱"
            class="h-10 pl-10 w-full text-xl block rounded" />
        </div>
      </div>
      <div class="w-1/5">
        <div class="colorgroup relative w-4/5 mx-auto">
          <i class="fas fa-palette absolute top-2 left-3 text-xl"></i>
          <VeeField type="color" name="color"
          class="h-10 pr-1 pl-10 w-full text-xl block rounded" />
        </div>
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
          bg-red-500 hover:bg-red-600" @click.prevent="editForm = false">取消</button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import { ref, toRef } from 'vue';
import { Switch } from '@headlessui/vue';
import { useConfirm } from '@/composables/useConfirmModal';

// 更新曲風
const handleEditForm = (genre, emit) => {
  const editForm = ref(false);
  const enabled = ref(genre.value.status);
  const editGenre = (e, id) => {
    let statusCode = 1;
    if (!enabled.value) {
      statusCode = 0;
    }
    const data = new FormData();
    data.append('name', e.name);
    data.append('color', e.color);
    data.append('status', statusCode);
    data.append('_method', 'put');
    emit('editGenre', id, data);
    // eslint-disable-next-line no-param-reassign
    genre.value.name = e.name;
    // eslint-disable-next-line no-param-reassign
    genre.value.color = e.color;
    // eslint-disable-next-line no-param-reassign
    genre.value.status = enabled.value;
    editForm.value = false;
  };
  return { editForm, enabled, editGenre };
};

export default {
  name: 'GenreItem',
  components: { Switch },
  props: ['genre', 'i'],
  emits: ['editGenre', 'deleteGenre'],
  setup(props, { emit }) {
    const genre = toRef(props, 'genre');
    const i = toRef(props, 'i');
    const { editForm, enabled, editGenre } = handleEditForm(genre, emit);
    const deleteGenre = (id) => {
      useConfirm().then((result) => {
        if (result) {
          emit('deleteGenre', id);
        }
      });
    };
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      genre, i, enabled, editForm, deleteGenre, editGenre,
    };
  },
};
</script>

<style scoped>
.w-1\/10 {
  width: 10%;
}
</style>
