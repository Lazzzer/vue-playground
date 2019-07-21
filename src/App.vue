<template>
  <div id="app" class="h-screen font-sans overflow-hidden">
    <Navbar></Navbar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    
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
  .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>