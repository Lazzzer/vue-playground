<template>
<div :style="hasCityName === false ? 'height: calc(100% - 60px)' : 'height: 100%'">
  <transition name="fade" mode="out-in">
  <div key=1 v-if="hasCityName === false" class="weather flex h-full flex-col justify-center items-center" >
    <div>
      <img alt="Weather logo" src="../assets/weather-anim.gif" class="block m-auto h-64 w-auto">
      <h1 class="text-5xl font-black text-teal-700 uppercase">Vue-Weather</h1>
        <form @submit.prevent class="relative w-full max-w-sm">
          <div class=" flex items-center">
            <input v-model="cityName" @keydown.enter.prevent @keyup.enter="onSubmit"
              class="bg-white outline-none focus:border-teal-500 border-2 border-gray-300 rounded-l-lg py-2 px-4 block w-full appearance-none leading-normal text-lg text-teal-800 font-bold" 
              type="text" placeholder="Enter the name of your city...">
            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-2 text-white py-2 px-4 rounded-r-lg text-lg appearance-none outline-none" 
                    type="button" @click="onSubmit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
        <div v-if="hasError" class="absolute mt-2 error-message text-sm ml-4">
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative flex" role="alert">
            <strong class="font-bold mr-2">Outch ! </strong>
            <span class="block sm:inline mr-2">The searched city is not found...</span>
              <svg
                @click="hasError = false"
                class="inline fill-current h-6 w-6 text-red-500" 
                role="button" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"><title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </div>
        </div> 
    </div>
  </div>
  <div key-2 v-else class="h-full bg-gray-200 animated">
    <button 
        @click="hasCityName = false, cityName = '', $store.state.minifyNavbar = false"
        class="py-2 px-3 bg-white hover:bg-gray-200 rounded-lg text-teal-500 font-bold absolute mt-4 ml-4 shadow-md"> <i class="fas fa-search-plus"></i> New search</button>
    <current-weather :weatherData="this.currentWeatherData"></current-weather>
    <forecast :forecastData="this.forecastData"></forecast>
  </div>
  </transition>
</div>
</template>

<script>
import axios from 'axios';
import CurrentWeather from '../components/weather/CurrentWeather.vue';
import Forecast from '../components/weather/Forecast.vue';

export default {
  components:{
    CurrentWeather,
    Forecast
  },
  data() {
    return {
      hasCityName: false,
      cityName: '',
      hasError: false,
      currentWeatherData: {},
      forecastData: {}
    }
  },
  methods: {
    onSubmit () {
      console.log(this.cityName)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&APPID=5930ff12f2a177a4379b45eb1959f053&units=metric`)
        .then(res => {
          console.log(res);
          this.currentWeatherData = res.data;
        })
        .catch(error => {
          console.log(error);
          this.hasError = true;
        });
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&APPID=5930ff12f2a177a4379b45eb1959f053&units=metric`)
        .then(res => {
          console.log(res);
          this.forecastData = res.data;
          this.$store.state.minifyNavbar = true; 
          this.hasCityName = true;

          this.hasError === true ? this.hasError = false : '';
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  destroyed() {
    this.$store.state.minifyNavbar = false; 
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