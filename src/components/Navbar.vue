<template>
    <div class="font-sans">
        <transition name="fade" mode="out-in">
            <div key=1 v-if="!isMinified" class="w-full py-4 shadow-md flex justify-center items-center">
                <router-link to="/" class="text-lg font-bold text-gray-800 no-underline"><i class="fas fa-home text-2xl"></i> Home</router-link>
                <router-link to="/weather" class="ml-3 text-lg font-bold text-gray-800 no-underline"><i class="fas fa-cloud-sun text-2xl"></i> Weather</router-link>
                <router-link to="/pokemon" class="ml-3 text-lg font-bold text-gray-800 no-underline flex align-middle">
                    <svg 
                        :class="[this.$route.path === '/pokemon' ? 'fill-current text-teal-500' : 'fill-current text-gray-800', 'h-6 w-auto inline-block mr-1']" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                        <path d="M500 10.1c-270.5 0-490 219.4-490 489.8 0 270.5 219.5 490 490 490s490-219.5 490-490S770.5 10.1 500 10.1zm0 343.2c81 0 146.8 65.6 146.8 146.6S581 646.7 500 646.7c-81 0-146.8-65.8-146.8-146.8 0-81 65.8-146.6 146.8-146.6zM84.7 531.4H290c15.2 102.3 103.5 180.7 210 180.7s194.8-78.4 210-180.7h205.3c-16.2 215.2-196 385.1-415.3 385.1S100.8 746.7 84.7 531.4z"/>
                    </svg>Pokédex
                </router-link>
            </div>
            <div key=2 v-else class="w-full flex justify-end items-center absolute">
                <router-link to="/" class="z-10 p-2 px-3 bg-white hover:bg-gray-200 rounded-lg text-teal-500 font-bold shadow-md mt-4 mr-6 sm:mr-4 no-underline"><i class="fas fa-home"></i> Home</router-link>
            </div>
        </transition>
    </div>
    
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    isMinified: function () {
      return this.$store.state.minifyNavbar;
    }

  },
}
</script>

<style>
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