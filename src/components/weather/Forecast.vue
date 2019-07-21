<template>
    <div class="h-1/3 text-center">
        <div>
            <h2 class="inline-block mt-12 text-3xl font-black text-teal-500 uppercase">5 days forecast at 15:00 UTC</h2>
            <sequential-entrance tag="div" fromBottom delay="400" firstDelay="800" contentClass="flex justify-center">
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
            daysDataArray: []
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
        }
    },
    mounted() {
        let fullArray = this.forecastData.list;

        fullArray.forEach(item => {
            if(item.dt_txt.includes('15:00:00')){
                this.daysDataArray.push(item);
            }
        });
    }
}
</script>