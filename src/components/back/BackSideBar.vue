<template>
  <div class="sidebar text-white w-64 h-full">
    <div class="bg-black w-full h-full opacity-75 flex flex-col">
      <div class="p-4 pb-0">
        <h2 class="text-white text-xl text-center
          border-b border-gray-50 border-opacity-70 pb-3">
        <i class="fas fa-user-shield mr-3"></i>後臺管理</h2>
      </div>
      <div class="overflow-auto">
        <ul class="p-4">
          <li class="py-1"><router-link :to="{ name: 'song-list' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-chart-line text-xl mr-4"></i>儀錶板</router-link>
          </li>
          <li class="py-1"><router-link :to="{ name: 'song-list' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-list-ul text-xl mr-4"></i>歌曲列表</router-link>
          </li>
          <li class="py-1"><router-link :to="{ name: 'add-song' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-upload text-xl mr-4"></i>新增歌曲</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.sidebar {
  background: url('../../assets/sidebar.jpg');
  background-size: cover;
}
</style>
