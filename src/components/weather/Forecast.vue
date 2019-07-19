<template>
    <div class="h-1/3">
        <div v-for="(forecast, index) in daysDataArray" :key="`forecast-${index}`" class="m-2">
            <p>Météo pour {{forecast.dt_txt}}</p>
            <p>Température: {{forecast.main.temp}}°</p>
            <p>Description: {{forecast.weather[0].description}}</p>
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