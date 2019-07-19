<template>
    <div class="h-2/3 flex flex-col justify-center items-center" :class="backColor">
        <div class="text-center">
            <img alt="Weather logo" :src="getLogoUrl(this.logo)" class="block m-auto h-64 w-auto">
            <h1 class="text-5xl font-black uppercase" :class="foreColor">{{this.weatherData.name}}</h1>
            <h1 class="text-5xl font-black" :class="foreColor">{{parseFloat(this.weatherData.main.temp).toFixed(1)}}°</h1>
            <h1 class="text-4xl font-bold" :class="foreColor">{{this.weatherData.weather[0].description}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        weatherData : Object
    },
    data() {
        return {
            logo: 'weather-anim.gif',
            foreColor: 'text-teal-500',
            backColor: 'bg-white',
        }
    },
    methods: {
        getLogoUrl(pic){
            return require('../../assets/'+ pic)
        }
    },
    mounted(){
        if(this.weatherData.weather[0].id > 700 && this.weatherData.weather[0].id < 800 ){
            this.logo = 'Atmosphere.gif';
        }else{
            this.logo = this.weatherData.weather[0].main + '.gif';
        }
    }
}
</script>