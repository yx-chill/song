<template>
  <header class="h-14 p-3 bg-gray-200">
    <nav class="container flex justify-between m-auto">
      <ul class="flex">
        <li>
      <router-link class="text-white font-bold text-2xl mr-4"
        :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
      <router-link class="text-white font-bold text-2xl mr-4"
        :to="{ name: 'about' }">About</router-link>
        </li>
      </ul>
      <router-link class="text-white font-bold text-2xl"
       :to="{ name: 'login' }">登入</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>
