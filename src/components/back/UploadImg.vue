<template>
  <div class="bg-white p-4 rounded">
    <h3 class="text-xl">音樂圖片</h3>
    <div class="w-full border aspect-w-1 aspect-h-1 mb-4 rounded">
      <img class="rounded" :src="preview" alt="music photo" v-if="preview">
    </div>
    <input type="file" accept="image/*" @change="previewImage($event)">
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UploadImg',
  setup() {
    const preview = ref('');
    const previewImage = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        preview.value = event.target.result;
      });
    };
    return {
      preview, previewImage,
    };
  },
  methods: {
    // previewImage(e) {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.addEventListener('load', this.imageLoaded);
    //   reader.readAsDataURL(file);
    // },
  },
};
</script>

<style>

</style>
