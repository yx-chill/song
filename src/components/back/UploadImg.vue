<template>
  <div class="bg-white p-4 rounded">
    <h3 class="text-xl">音樂圖片</h3>
    <div class="w-full border aspect-w-1 aspect-h-1 mb-4
      rounded overflow-hidden relative">
      <div class="w-full h-full">
        <img v-if="preview" :src="preview" alt="music photo" class="w-full h-full">
        <i v-if="preview" class="fa fa-times text-xl cursor-pointer px-1
          absolute top-3 right-3 rounded-full"
        @click="cancelImg" />
      </div>
    </div>
    <button type="button" class="block bg-green-500 rounded text-white
      hover:bg-green-400 duration-500 px-2 py-1"
      @click="chooseImg">選擇圖片</button>
    <input class="fixed -top-10 opacity-0"
      type="file" name="image" accept="image/*"
      @change="upload($event)" ref="imgDom" />
  </div>
</template>

<script>
import { ref, toRef, watch } from 'vue';
import { warningNotify } from '@/composables/useNotification';

export default {
  name: 'UploadImg',
  emits: ['uploadImg'],
  props: ['isClean'],
  setup(props, { emit }) {
    const isClean = toRef(props, 'isClean');
    const imgDom = ref(null);
    const preview = ref('');
    const file = ref('');

    const upload = (e) => {
      if (e.target.files[0].type.indexOf('image') === -1) {
        warningNotify('檔案格式錯誤', '請選擇圖片檔案');
        return;
      }
      // eslint-disable-next-line prefer-destructuring
      file.value = e.target.files[0];
      emit('uploadImg', file);
      const reader = new FileReader();
      reader.readAsDataURL(file.value);
      reader.addEventListener('load', (event) => {
        preview.value = event.target.result;
      });
    };

    const chooseImg = () => {
      imgDom.value.click();
    };

    const cancelImg = () => {
      imgDom.value.value = '';
      file.value = '';
      preview.value = '';
      emit('uploadImg', file);
    };

    watch(isClean, () => {
      cancelImg();
    });

    return {
      imgDom, preview, upload, chooseImg, cancelImg,
    };
  },
};
</script>
