<template>
  <main class="h-screen flex">
    <SideBar />
    <router-view class="p-5 w-full overflow-auto"></router-view>
  </main>
  <ConfirmModal v-model="showModal" @success="handleSuccess" @cancel="handleCancel"/>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import SideBar from '@/components/back/BackSideBar.vue';
import storage from '@/includes/storage';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { useConfirmModal } from '@/composables/useConfirmModal';
import { warningNotify } from '@/composables/useNotification';
import { get } from '@/includes/adminReq';

export default {
  name: 'Manage',
  components: {
    SideBar, ConfirmModal,
  },
  setup() {
    const router = useRouter();
    if (!storage.get('adminToken')) {
      router.push({ name: 'admin' }).then(() => warningNotify('請先登入'));
    }
    const genreData = reactive({ genres: [] });
    get('v1/admin/music-type').then((res) => {
      genreData.genres = res.data.data;
    }).catch((error) => {
      console.log(error);
    });
    return { ...useConfirmModal() };
  },
};
</script>

<style>

</style>
