<template>
  <div id="app" class="h-screen font-sans overflow-hidden">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: {
    Navbar
  }
}
</script>

<style src="./assets/tailwind.css">