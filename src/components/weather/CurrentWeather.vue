<template>
    <div class="h-2/3">
        <img alt="Weather logo" src="../../assets/logo.png" class="block m-auto h-64 w-auto">
        <h1 class="text-5xl font-black uppercase">{{this.weatherData.name}}</h1>
        <h1 class="text-4xl text-white">{{parseFloat(this.weatherData.main.temp).toFixed(1)}}°</h1>
        <h1 class="text-4xl text-white">{{this.weatherData.weather[0].description}}</h1>
    </div>
</template>

<script>
export default {
    props:{
        weatherData : Object
    } 
}
</script>