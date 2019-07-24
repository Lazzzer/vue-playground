<template>
    <div class="h-1/3 text-center">
            <div>
                <h2 class="weatherForcast inline-block mt-10 sm:mt-12 text-base sm:text-2xl xl:text-3xl font-black text-teal-500 uppercase animated fadeInUp delay-1s">5 days forecast at {{ this.localTime}} local time</h2>
                <sequential-entrance tag="div" fromBottom delay="250" firstDelay="400" contentClass="flex justify-start md:justify-center scrolling overflow-x-auto overflow-y-hidden pb-8">
                    <div v-for="(forecast, index) in daysDataArray" :key="`forecast-${index}`" 
                        :class="[index === 0 ? 'ml-4' : '', 'm-2 mt-4 sm:mt-2 w-24 sm:w-32 bg-white text-center rounded-lg shadow-lg h-32 sm:h-40 flex-shrink-0']">
                        <div :class="[ forecast.weather[0].id === 800 ? 'bg-blue-300' : 'bg-gray-500','sm:px-4 sm:pt-3  rounded-t-lg flex items-center']">
                            <img :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`" alt="forecast image" class="h-20 w-auto mx-auto sm:h-24">
                        </div>
                        <div class="text-center sm:px-4 rounded-b-lg">
                            <p class=" text-base sm:text-lg font-bold text-black">{{ convertToDay(forecast.dt * 1000)}}</p>
                            <p class="mb-1 -mt-2 text-xl font-black text-teal-500">{{parseFloat(forecast.main.temp).toFixed(1)}}°</p>
                        </div>
                    </div>
                </sequential-entrance>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            daysDataArray: [],
            localTime: null,
        }
    },
    props:{
        forecastData : Object
    },
    methods: {
        convertToDay(timestamp) {
            let numberDay = new Date(timestamp).getDay();
            let day;

            switch (numberDay) {
                case 0:
                    day = 'Sunday'
                    break;
                case 1:
                    day = 'Monday'
                    break;
                case 2:
                    day = 'Tuesday'
                    break;
                case 3:
                    day = 'Wednesday'
                    break;
                case 4:
                    day = 'Thursday'
                    break;
                case 5:
                    day = 'Friday'
                    break;
                case 6:
                    day = 'Saturday'
                    break;
                default:
                    break;
            }
            return day;
        },
        getLocalHour(time){
            let hour = new Date(time);
            hour = hour.toUTCString();
            let hArray = hour.split(' ');
            
            return hArray[4];
        },getForecast(){
            const fullArray = this.forecastData.list;
            const timezone = this.forecastData.city.timezone;

            fullArray.forEach(item => {
                const hour = Number(this.getLocalHour((item.dt + timezone) * 1000).substr(0,2));

                if(hour >= 15 && hour <= 17){
                    this.daysDataArray.push(item);
                }
            });

            this.localTime = this.getLocalHour((this.daysDataArray[0].dt + timezone) * 1000).slice(0,-3);
        }
    },
    mounted() {
        this.getForecast();
    }
}
</script>