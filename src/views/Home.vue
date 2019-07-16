<template>
  <div class="home h-full flex flex-col justify-center items-center font-sans">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" class="block m-auto h-64 w-auto">
      <h1 class="text-5xl font-black text-teal-700 uppercase">Vue-Playground</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
