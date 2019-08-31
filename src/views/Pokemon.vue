<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <svg 
        class="h-16 w-auto inline-block fill-current text-red-800 " 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <path d="M500 10.1c-270.5 0-490 219.4-490 489.8 0 270.5 219.5 490 490 490s490-219.5 490-490S770.5 10.1 500 10.1zm0 343.2c81 0 146.8 65.6 146.8 146.6S581 646.7 500 646.7c-81 0-146.8-65.8-146.8-146.8 0-81 65.8-146.6 146.8-146.6zM84.7 531.4H290c15.2 102.3 103.5 180.7 210 180.7s194.8-78.4 210-180.7h205.3c-16.2 215.2-196 385.1-415.3 385.1S100.8 746.7 84.7 531.4z"/>
    </svg>
    <h1 class="text-4xl sm:text-5xl font-black text-red-700 uppercase">Vue-Pokédex</h1>
    <form @submit.prevent class="relative w-full max-w-sm mb-10">
      <div class=" flex items-center">
        <input v-model="pokemonName" @keydown.enter.prevent @keyup.enter="onSubmit"
          class="bg-white outline-none focus:border-red-500 border-2 border-gray-300 rounded-l-lg py-2 px-4 block w-full appearance-none leading-normal text-base sm:text-lg text-red-800 font-bold" 
          type="text" placeholder="Search a Pokémon">
        <button class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 border-2 text-white py-2 px-4 rounded-r-lg text-base sm:text-lg appearance-none outline-none" 
                type="button" @click="onSubmit">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>
    <div class="w-full h-72 flex items-center justify-center">
      <div class="mr-6 card w-56 h-56 bg-gray-200 shadow-lg hover:shadow-2xl rounded-full flex-shrink-0">
        <h2 class="mt-4 text-gray-800 font-black text-base text-center">#1</h2>
        <img class="-mt-3 w-40 h-auto mx-auto my-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="pokemon">
        <h2 class="-mt-4 text-gray-800 font-black text-base text-center">Bulbizarre</h2>
      </div>
      <div class="mr-6 card w-56 h-56 bg-gray-200 shadow-lg hover:shadow-2xl rounded-full">
        <h2 class="mt-4 text-gray-800 font-black text-base text-center">#2</h2>
        <img class="-mt-3 w-40 h-auto mx-auto my-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" alt="pokemon">
        <h2 class="-mt-4 text-gray-800 font-black text-base text-center">Herbizarre</h2>
      </div>
      <div class="card w-56 h-56 bg-gray-200 shadow-lg hover:shadow-2xl rounded-full">
        <h2 class="mt-4 text-gray-800 font-black text-base text-center">#3</h2>
        <img class="-mt-3 w-40 h-auto mx-auto my-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" alt="pokemon">
        <h2 class="-mt-4 text-gray-800 font-black text-base text-center">Florizarre</h2>
      </div>
    </div>

    <div class="w-82 h-32 mt-10 mb-20">
      <div>value: {{ sliderCurrentValue }}</div>
      <vue-slider 
        v-model="sliderCurrentValue"
        :min="1"
        :max="sliderMaxValue"
        :marks="sliderMarks"
        :process="false"
        :railStyle="{
          height: '10px',
        }"
      ></vue-slider>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  components: {
    VueSlider
  },
  data() {
    return {
      pokemonList: [],
      sliderMaxValue: 807,
      sliderCurrentValue: 1,
      sliderMarks: [100, 200, 300, 400, 500, 600, 700, 800],
      pokemonName: '',
      selectedPokemon: Object
    }
  },
  methods: {
    fetchPokemonList() {
      axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${this.sliderMaxValue}`)
        .then(res => {
          console.log(res);
          this.pokemonList = res.data.results;
          this.sliderMaxValue = this.pokemonList.length;
          localStorage.setItem('pokemonList', JSON.stringify(res.data.results));
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`)
        .then(res => {
          console.log(res);
          this.selectedPokemon = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    if (localStorage.getItem('pokemonList')) {
      try {
        this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        this.sliderMaxValue = this.pokemonList.length;
      } catch (error) {
        console.log('Error when retrieving data from local storage.')
        localStorage.removeItem('pokemonList');
        this.fetchPokemonList();
      }
    } else {
      this.fetchPokemonList();
    }
  },


}
</script>