<template>
  <main class="flex h-full bg-gray-700">
    <SideBar />
    <section class="w-full">
      <Header />
      <div class="p-5 text-gray-300">
        favorite
      </div>
    </section>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'Favorite',
  components: {
    Header, SideBar,
  },
};
</script>

<style>

</style>
