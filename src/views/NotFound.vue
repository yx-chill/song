<template>
  <div class="w-full h-full relative">
    <h2 class="text-green-700 text-9xl font-bold absolute top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2 opacity-50 select-none">404</h2>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      text-white font-bold text-center space-y-2">
      <p class="text-2xl">沒有相關音樂資訊</p>
      <router-link :to="{ name: 'home' }" class="block border rounded py-2 hover:bg-green-700
        duration-300">
        回首頁</router-link>
    </div>
  </div>
</template>
