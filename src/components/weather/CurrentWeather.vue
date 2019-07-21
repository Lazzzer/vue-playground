<template>
    <div class="h-2/3 flex flex-col justify-center items-center" :class="backColor">
        <div class="slideInDown animated">
            <div class="mt-24 text-center border rounded-lg px-6 py-8 shadow-lg bg-white w-80 ">
                <h1 class="text-5xl font-black uppercase text-teal-500">{{this.weatherData.name}}</h1>
                <img alt="Weather logo" :src="getLogoUrl(this.logo)" class="block m-auto h-64 w-auto mt-4">
                <p class="mt-2 text-xl italic ">It's actually <span class="text-teal-500 font-bold">{{parseFloat(this.weatherData.main.temp).toFixed(1)}}°</span> in <span class="font-bold">{{this.weatherData.name}}</span> with {{ this.weatherData.weather[0].description }}.</p>
                <div class="mt-8 flex flex-col text-left w-48 mx-auto">
                    <p class="text-teal-500 font-bold text-sm">Time: <span class="text-black font-normal italic"> {{getLocalHour(this.weatherData.dt * 1000)}} </span></p>
                    <p class="text-teal-500 font-bold text-sm">Temp° Min: <span class="text-black font-normal italic mr-2"> {{parseFloat(this.weatherData.main.temp_min).toFixed(1)}}° </span>Max: <span class="text-black font-normal italic">{{parseFloat(this.weatherData.main.temp_max).toFixed(1)}}°</span></p>
                    <p class="text-teal-500 font-bold text-sm">Pressure: <span class="text-black font-normal italic"> {{parseFloat(this.weatherData.main.pressure).toFixed(1)}} hPa </span></p>
                    <p class="text-teal-500 font-bold text-sm">Humidity: <span class="text-black font-normal italic"> {{parseFloat(this.weatherData.main.humidity).toFixed(1)}}% </span></p>
                    <p class="text-teal-500 font-bold text-sm">Wind Speed: <span class="text-black font-normal italic"> {{parseFloat(this.weatherData.wind.speed * 3.6).toFixed(1)}} km/h </span></p>
                </div>     
            </div>
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
        },
        upperCaseFirstLetter(description){
            let desc = description;
            return desc.charAt(0).toUpperCase() + desc.slice(1);
        },
        getLocalHour(time){
            let hour = new Date(time);
            hour = hour.toLocaleTimeString();
            return hour.slice(0,-3);
        },
        changeBackColor(){
            let typeId = this.weatherData.weather[0].id;

            if(typeId === 800){
                this.backColor = 'bg-blue-400';
            }else if(typeId >= 600 && typeId <= 622 ){
                this.backColor = 'bg-gray-100';
            }else{
                this.backColor = 'bg-gray-500';
            }
        }
    },
    mounted(){

        this.changeBackColor();

        if(this.weatherData.weather[0].id > 700 && this.weatherData.weather[0].id < 800 ){
            this.logo = 'Atmosphere.gif';
        }else{
            this.logo = this.weatherData.weather[0].main + '.gif';
        }
    }
}
</script>