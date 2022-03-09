<template>
  <div class="sidebar text-white w-20 h-full">
    <div class="bg-black w-full h-full opacity-75 p-3 flex flex-col relative">
      <div class="absolute bottom-0 left-0 p-3 text-center
          rounded hover:bg-opacity-20 hover:bg-white block w-full">
        <button type="button" class="block w-full" @click="adminLogout">
          <i class="fas fa-sign-out-alt text-xl mr-4"></i>
          <span class="text hidden">登出</span>
        </button>
      </div>
      <div class="p-3 pb-0">
        <h2 class="text-white text-xl text-center
          border-b border-gray-50 border-opacity-70 pb-3">
          <i class="fas fa-user-shield text-xl mr-3"></i>
          <span class="text hidden">後臺管理</span>
        </h2>
      </div>
      <div class="overflow-auto">
        <ul class="text-center">
          <li class="py-1"><router-link :to="{ name: 'song-list' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-list-ul text-xl mr-4"></i>
            <span class="text hidden">歌曲列表</span>
            </router-link>
          </li>
          <li class="py-1"><router-link :to="{ name: 'add-song' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-upload text-xl mr-4"></i>
            <span class="text hidden">新增歌曲</span>
            </router-link>
          </li>
          <li class="py-1"><router-link :to="{ name: 'genre-list' }"
            class="block w-full rounded hover:bg-opacity-20 hover:bg-white px-3 py-1">
            <i class="fas fa-bookmark text-xl ml-02 mr-18"></i>
            <span class="text hidden">曲風管理</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { get } from '@/includes/adminReq';
import storage from '@/includes/storage';
import { successNotify } from '@/composables/useNotification';

export default {
  name: 'BackSideBar',
  setup() {
    const router = useRouter();
    const adminLogout = async () => {
      await get('v1/admin/logout').then(() => {
        storage.remove('adminToken');
        storage.remove('adminRefresh');
        router.push({ name: 'admin' }).then(() => successNotify('登出成功'));
      }).catch((err) => {
        console.log(err.response);
        storage.remove('adminToken');
        storage.remove('adminRefresh');
        router.push({ name: 'admin' });
      });
    };
    return {
      adminLogout,
    };
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  background: url('../../assets/sidebar.jpg');
  background-size: cover;
  transition: .3s;
  &:hover {
    width: 260px;
    & ul {
      text-align: left;
      padding: 16px;
    }
    & .text {
      display: inline-block;
    }
  }
}
.ml-02 {
  margin-left: 2px;
}
.mr-18 {
  margin-right: 18px;
}
</style>
