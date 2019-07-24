<template>
    <div class="h-2/3 flex flex-col justify-center items-center" :class="backColor">
        <div class="fadeInDown animated w-72 sm:w-80">
            <div class="mt-16 md:mt-20 text-center border rounded-lg px-3 sm:px-6 py-6 sm:py-8 shadow-lg bg-white weatherCard">
                <h1 class="text-2xl sm:text-4xl xl:text-5xl font-black uppercase text-teal-500 mb-4 weatherTitle">{{this.weatherData.name}}</h1>
                <lottie :options="logoOptions" :height="256" :width="256" class="screenSize"/>
                <p class="mt-2 text-sm sm:text-lg italic ">It's actually <span class="text-teal-500 font-bold">{{parseFloat(this.weatherData.main.temp).toFixed(1)}}°</span> in <span class="font-bold">{{this.weatherData.name}}</span> with {{ this.weatherData.weather[0].description }}.</p>
                <div class="mt-8 flex flex-col text-left w-48 mx-auto weatherText">
                    <p class="text-teal-500 font-bold text-sm">Time: <span class="text-black font-normal italic"> {{getLocalHour((this.weatherData.dt + this.weatherData.timezone) * 1000)}} </span></p>
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
import lottie from 'vue-lottie';

import * as animClearDay from '../../assets/Clear-Day.json';
import * as animClearNight from '../../assets/Clear-Night.json';

import * as animCloud from '../../assets/Cloud.json';
import * as animCloudyDay from '../../assets/Cloudy-Day.json';
import * as animCloudyNight from '../../assets/Cloudy-Night.json';

import * as animRainDay from '../../assets/Rain-Day.json'
import * as animRainNight from '../../assets/Rain-Night.json'

import * as animMist from '../../assets/Mist.json';
import * as animSnow from '../../assets/Snow.json'
import * as animStorm from '../../assets/Storm.json'
import * as animThunder from '../../assets/Thunder.json'

import * as animationLogo from '../../assets/weatherLogo.json';

export default {
    components:{
        lottie
    },
    props:{
        weatherData : Object
    },
    data() {
        return {
            logoOptions: {
                animationData: null,
                loop: true
            },
            animationSpeed: 1,
            foreColor: 'text-teal-500',
            backColor: 'bg-white'
        }
    },
    methods: {
        getLocalHour(time){
            let hour = new Date(time);
            hour = hour.toUTCString();
            let hArray = hour.split(' ');
            
            return hArray[4].slice(0,-3);
        },
        changeColorsAndAnim(){

            const hour = Number(this.getLocalHour((this.weatherData.dt + this.weatherData.timezone) * 1000).substr(0,2));
            const id = this.weatherData.weather[0].id;

            //DAY
            if(hour > 5 && hour < 18){
                //STORM
                if((id >= 200 && id <= 202) || (id >= 230 && id <= 232) ){
                    this.logoOptions.animationData = animStorm.default;
                    this.backColor = 'bg-gray-500';
                    return;
                //THUNDER
                }else if(id >= 210 && id <= 212){
                    this.logoOptions.animationData = animThunder.default;
                    this.backColor = 'bg-gray-500';
                    return;
                }
                //RAIN
                else if((id >= 300 && id <= 321)  || (id >= 500 && id <= 531)){
                    this.logoOptions.animationData = animRainDay.default;
                    this.backColor = 'bg-gray-500';
                    return;
                }
                //SNOW
                else if(id >= 600 && id <= 622){
                    this.logoOptions.animationData = animSnow.default;
                    this.backColor = 'bg-blue-200';
                    return;
                }
                //MISTY STUFF
                else if(id >= 701 && id <= 781){
                    this.logoOptions.animationData = animMist.default;
                    this.backColor = 'bg-gray-400';
                    return;
                }
                //CLEAR
                else if(id === 800){
                    this.logoOptions.animationData = animClearDay.default;
                    this.backColor = 'bg-blue-500';
                    return;
                }
                //FEW CLOUDS
                else if(id === 801 || id === 802){
                    this.logoOptions.animationData = animCloudyDay.default;
                    this.backColor = 'bg-blue-300';
                    return;
                }
                //CLOUD
                else if(id === 803 || id === 804){
                    this.logoOptions.animationData = animCloud.default;
                    this.backColor = 'bg-gray-400';
                    return;
                }else{
                    this.logoOptions.animationData = animationLogo.default;
                    this.backColor = 'bg-teal-500';
                }
            //NIGHT   
            }else{
                //STORM
                if((id >= 200 && id <= 202) || (id >= 230 && id <= 232) ){
                    this.logoOptions.animationData = animStorm.default;
                    this.backColor = 'bg-gray-900';
                    return;
                }
                //THUNDER
                else if(id >= 210 && id <= 212){
                    this.logoOptions.animationData = animThunder.default;
                    this.backColor = 'bg-gray-900';
                    return;
                }
                //RAIN
                else if((id >= 300 && id <= 321)  || (id >= 500 && id <= 531)){
                    this.logoOptions.animationData = animRainNight.default;
                    this.backColor = 'bg-gray-800';
                    return;
                }
                //SNOW
                else if(id >= 600 && id <= 622){
                    this.logoOptions.animationData = animSnow.default;
                    this.backColor = 'bg-gray-700';
                    return;
                }
                //MISTY STUFF
                else if(id >= 701 && id <= 781){
                    this.logoOptions.animationData = animMist.default;
                    this.backColor = 'bg-gray-700';
                    return;
                }
                //Clear
                else if(id === 800){
                    this.logoOptions.animationData = animClearNight.default;
                    this.backColor = 'bg-blue-900';
                    return;
                }
                //FEW CLOUDS
                else if(id === 801 || id === 802){
                    this.logoOptions.animationData = animCloudyNight.default;
                    this.backColor = 'bg-blue-800';
                    return;
                }
                //CLOUD
                else if(id === 803 || id === 804){
                    this.logoOptions.animationData = animCloud.default;
                    this.backColor = 'bg-gray-800';
                    return;
                }else{
                    this.logoOptions.animationData = animationLogo.default;
                    this.backColor = 'bg-teal-500';
                }
            }
        }
    },
    created(){
        this.changeColorsAndAnim();
    }
}
</script>