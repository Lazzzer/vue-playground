<template>
    <div class="h-1/3 text-center">
            <div>
                <h2 class="inline-block mt-12 text-3xl font-black text-teal-500 uppercase animated fadeIn delay-1s">5 days forecast at {{ this.localTime}} local time</h2>
                <sequential-entrance tag="div" fromBottom delay="400" contentClass="flex justify-center">
                    <div v-for="(forecast, index) in daysDataArray" :key="`forecast-${index}`" class="m-2 mt-2 w-32 bg-white text-center rounded-lg shadow-lg">
                        <div class="px-4 pt-3 w-full h-2/3 bg-gray-500 rounded-t-lg flex items-center">
                            <img :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`" alt="forecast image">
                        </div>
                        <div class="text-center h-1/3 px-4 pb-3 rounded-b-lg">
                            <p class="mt-1 text-lg font-bold text-black">{{ convertToDay(forecast.dt * 1000)}}</p>
                            <p class="mb-1 -mt-1 text-xl font-black text-teal-500">{{parseFloat(forecast.main.temp).toFixed(1)}}°</p>
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
            localTime: null
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
        }
    },
    mounted() {
        const fullArray = this.forecastData.list;
        const timezone = this.forecastData.city.timezone;

        fullArray.forEach(item => {
            const hour = Number(this.getLocalHour((item.dt + timezone) * 1000).substr(0,2));

            if(hour >= 15 && hour <= 17){
                this.daysDataArray.push(item);
            }
        });
        console.log(this.daysDataArray);

        this.localTime = this.getLocalHour((this.daysDataArray[0].dt + timezone) * 1000).slice(0,-3);
    }
}
</script>