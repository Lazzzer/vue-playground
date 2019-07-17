<template>
<div :style="hasCityName === false ? 'height: calc(100% - 60px)' : 'height: 100%'">
  <div v-if="hasCityName === false" class="weather flex h-full flex-col justify-center items-center font-sans" >
    <div>
      <img alt="Vue logo" src="../assets/weather-anim.gif" class="block m-auto h-64 w-auto">
      <h1 class="text-5xl font-black text-teal-700 uppercase">Vue-Weather</h1>
        <form class="w-full max-w-sm">
          <div class="flex items-center">
            <input v-model="cityName" 
              class="bg-white outline-none focus:border-teal-500 border-2 border-gray-300 rounded-l-lg py-2 px-4 block w-full appearance-none leading-normal text-lg text-teal-800 font-bold" 
              type="text" placeholder="Tapez le nom de votre ville...">
            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-2 text-white py-2 px-4 rounded-r-lg text-lg appearance-none outline-none" 
                    type="button" @click="onSubmit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
    </div>
  </div>
  <div v-else class="h-full bg-gray-600">

  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hasCityName: false,
      cityName: ''
    }
  },
  methods: {
    onSubmit () {
      console.log(this.cityName)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&APPID=5930ff12f2a177a4379b45eb1959f053`)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.$store.state.minifyNavbar = true; 
  },
  destroyed() {
    this.$store.state.minifyNavbar = false; 
  },
}
</script>
