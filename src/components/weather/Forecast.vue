<template>
    <div class="h-1/3 text-center">
        <div class="flex justify-center">
            <div v-for="(forecast, index) in daysDataArray" :key="`forecast-${index}`" class="m-2 mt-20 text-left">
                <p class="text-2xl">{{ convertToDay(forecast.dt * 1000)}}</p>
                <p class="text-lg">At 15:00 UTC</p>
                <p class="text-2xl font-black">{{parseFloat(forecast.main.temp).toFixed(1)}}°</p>
                <p class="text-xl italic">{{forecast.weather[0].description}}</p>
            </div>
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