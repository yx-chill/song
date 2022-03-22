<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="p-6 font-bold border-b border-gray-200">
      <span class="card-title">上傳歌曲</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <div class=" w-full px-10 py-20 rounded text-center cursor-pointer
          border border-dashed border-gray-400 text-gray-400
          transition duration-500 hover:text-white hover:bg-green-400
          hover:border-green-400 hover:border-solid mb-3"
          :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
          @dragend.prevent.stop="isDragover = false"
          @dragover.prevent.stop="isDragover = true"
          @dragenter.prevent.stop="isDragover = true"
          @dragleave.prevent.stop="isDragover = false"
          @drop.prevent.stop="upload($event)">
        <h5>Drop your files here</h5>
      </div>
      <p class="text-red-500 text-sm font-bold">檔案限制 : 5MB</p>
      <div class="flex items-center gap-x-4 mt-3">
        <button type="button" class="block bg-green-500 rounded text-white
          hover:bg-green-400 duration-500 px-2 py-1"
          @click="choose">選擇歌曲</button>
        <p v-if="file">{{ file.name }}
          <i class="fa fa-times text-xl ml-3 cursor-pointer" @click="cancelFile" />
        </p>
        <p class="font-bold" v-else>尚未上傳歌曲</p>
      </div>
      <input class="fixed -top-10 opacity-0"
        type="file" name="file" accept="audio/mpeg"
        @change="upload($event)" ref="fileDom" />
    </div>
  </div>
</template>

<script>
import { ref, toRef, watch } from 'vue';
import { warningNotify } from '@/composables/useNotification';

export default {
  name: 'UploadSong',
  emits: ['uploadSong'],
  props: ['isClean'],
  setup(props, { emit }) {
    const isClean = toRef(props, 'isClean');
    const fileDom = ref(null);
    const isDragover = ref(false);
    const file = ref('');
    const choose = () => {
      fileDom.value.click();
    };
    const cancelFile = () => {
      fileDom.value.value = '';
      file.value = '';
      emit('uploadSong', file.value);
    };
    const upload = (e) => {
      isDragover.value = false;
      file.value = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      if (file.value.size > 5242880) {
        warningNotify('超過檔案大小限制', '請選擇歌曲檔案');
        fileDom.value.vlue = '';
        file.value = '';
        return;
      }
      if (file.value.type !== 'audio/mpeg') {
        warningNotify('檔案格式錯誤', '請選擇歌曲檔案');
        fileDom.value.vlue = '';
        file.value = '';
        return;
      }
      emit('uploadSong', file.value);
    };

    watch(isClean, () => {
      cancelFile();
    });

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      file, fileDom, isDragover, choose, cancelFile, upload, isClean,
    };
  },
};
</script>

<style>

</style>
