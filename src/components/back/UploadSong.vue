<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="p-6 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <div class=" w-full px-10 py-20 rounded text-center cursor-pointer
          border border-dashed border-gray-400 text-gray-400
          transition duration-500 hover:text-white hover:bg-green-400
          hover:border-green-400 hover:border-solid mb-3"
          :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="isDragover = false"
          @dragover.prevent.stop="isDragover = true"
          @dragenter.prevent.stop="isDragover = true"
          @dragleave.prevent.stop="isDragover = false"
          @drop.prevent.stop="upload($event)">
        <h5>Drop your files here</h5>
      </div>
      <input type="file" @change="upload($event)" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UploadSong',
  setup() {
    const isDragover = ref(false);
    const upload = (e) => {
      isDragover.value = false;
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      console.log(files);
    };
    return {
      isDragover, upload,
    };
  },
};
</script>

<style>

</style>
