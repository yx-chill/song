<template>
  <section>
    <form @submit.prevent="login" class=" bg-green-200 bg-opacity-80
      p-4 rounded">
      <div class="flex justify-between gap-3 mb-2">
        <div class="w-3/4">
          <div class="emailgroup relative mb-3">
            <i class="fas fa-compact-disc absolute top-2 left-3 text-xl"></i>
            <input type="text" name="songname" placeholder="歌曲名稱"
              class="h-10 pl-10 text-xl block w-full rounded mb-1" />
          </div>
          <div class="passwordgroup relative mb-3">
            <i class="fas fa-headphones absolute top-2 left-3 text-xl"></i>
            <!-- <i class="fas fa-sort-down absolute top-2 right-3 text-xl"></i> -->
            <select name="genre" class="password h-10 px-10 text-xl block w-full rounded mb-1">
              <option value="pop">pop</option>
              <option value="jazz">jazz</option>
            </select>
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
    </form>
  </section>
</template>

<script>
// import axios from 'axios';
import UploadSong from '@/components/back/UploadSong.vue';
import UploadImg from '@/components/back/UploadImg.vue';

export default {
  name: 'AddSong',
  components: {
    UploadSong,
    UploadImg,
  },
};
</script>

<style>
</style>
