<template>
  <header class="h-14 p-2 bg-gray-800 w-full">
    <nav class="container flex justify-between items-center m-auto">
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
      <router-link class="text-purple-200 font-bold text-sm px-3 py-2
        rounded-sm border border-purple-200"
       :to="{ name: 'login' }">登入</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>
