<template>
  <div v-if="this.pokemonList" class="mt-10 h-screen flex flex-col justify-center items-center">
    <svg 
        class="h-16 w-auto inline-block fill-current text-red-800 " 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <path d="M500 10.1c-270.5 0-490 219.4-490 489.8 0 270.5 219.5 490 490 490s490-219.5 490-490S770.5 10.1 500 10.1zm0 343.2c81 0 146.8 65.6 146.8 146.6S581 646.7 500 646.7c-81 0-146.8-65.8-146.8-146.8 0-81 65.8-146.6 146.8-146.6zM84.7 531.4H290c15.2 102.3 103.5 180.7 210 180.7s194.8-78.4 210-180.7h205.3c-16.2 215.2-196 385.1-415.3 385.1S100.8 746.7 84.7 531.4z"/>
    </svg>
    <h1 class="text-4xl sm:text-5xl font-black text-red-700 uppercase">Vue-Pokédex</h1>
    <form @submit.prevent class="relative w-full max-w-xs sm:max-w-sm sm:mb-10">
      <div class=" flex items-center">
        <input v-model="pokemonName" @keydown.enter.prevent @keyup.enter="onSubmit"
          class="bg-white outline-none focus:border-red-500 border-2 border-gray-300 rounded-l-lg py-2 px-4 block w-full appearance-none leading-normal text-sm sm:text-base sm:text-lg text-red-800 font-bold" 
          type="text" placeholder="Search a Pokémon by name or ID">
        <button class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 border-2 text-white py-2 px-4 rounded-r-lg text-sm sm:text-base sm:text-lg appearance-none outline-none" 
                type="button" @click="onSubmit">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>
    <div class="w-full h-56 sm:h-72 flex items-center justify-center">
      <div class="mr-4 sm:mr-6">
        <span class="block italic text-red-500 font-black text-base text-center">#{{computedFirstId}}</span>
        <h2 class="text-gray-800 font-black text-sm sm:text-base text-center">{{pokemonList[computedFirstId - 1].name.toUpperCase()}}</h2>
        <div :class="[computedFirstId === sliderCurrentValue ? 'border-2 border-red-400 bg-red-300 ' : 'bg-gray-200' , 'w-24 h-24 sm:w-56 sm:h-56 shadow-lg hover:shadow-2xl rounded-full flex-shrink-0 cursor-pointer flex items-center']">
          <img class="w-48 h-auto mx-auto" :src="getPokeImg(computedFirstId)" alt="pokemon">
        </div>
      </div>
      <div class="mr-4 sm:mr-6">
        <span class="block italic text-red-500 font-black text-base text-center">#{{computedSecondtId}}</span>
        <h2 class="text-gray-800 font-black text-sm sm:text-base text-center">{{pokemonList[computedSecondtId - 1].name.toUpperCase()}}</h2>
        <div :class="[computedSecondtId === sliderCurrentValue ? 'border-2 border-red-400 bg-red-300 ' : 'bg-gray-200' , 'w-24 h-24 sm:w-56 shadow-lg hover:shadow-2xl rounded-full flex-shrink-0 cursor-pointer flex items-center']">
          <img class="w-48 h-auto mx-auto" :src="getPokeImg(computedSecondtId)" alt="pokemon">
        </div>
      </div>
      <div>
        <span class="block italic text-red-500 font-black text-base text-center">#{{computedThirdtId}}</span>
        <h2 class="text-gray-800 font-black text-sm sm:text-base text-center">{{pokemonList[computedThirdtId - 1].name.toUpperCase()}}</h2>
        <div :class="[computedThirdtId === sliderCurrentValue ? 'border-2 border-red-400 bg-red-300 ' : 'bg-gray-200' , 'w-24 h-24 sm:w-56 shadow-lg hover:shadow-2xl rounded-full flex-shrink-0 cursor-pointer flex items-center']">
          <img class="w-48 h-auto mx-auto" :src="getPokeImg(computedThirdtId)" alt="pokemon">
        </div>
      </div>
    </div>
    <div class="w-72 sm:w-82 h-32 mt-10 mb-20">
      <vue-slider
        v-model="sliderCurrentValue"
        :lazy="true"
        :min="1"
        :max="sliderMaxValue"
        :marks="sliderMarks"
        :process="false"
        :dotSize="20"
        :dotOptions="{
        
        }"
        :dotStyle="{
          backgroundColor: '#fed7d7',
          border: '2px solid #c53030',
        }"
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
import '../assets/antd.css';
import { setInterval } from 'timers';

export default {
  components: {
    VueSlider
  },
  data() {
    return {
      pokemonList: null,
      sliderMaxValue: 807,
      sliderCurrentValue: 1,
      sliderMarks: {
        '1': {
          label: '1',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '100': {
          label: '100',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '200': {
          label: '200',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '300': {
          label: '300',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '400': {
          label: '400',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '500': {
          label: '500',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '600': {
          label: '600',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '700': {
          label: '700',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
        '807': {
          label: '807',
          style: {
            width: '20px',
            height: '20px',
            display: 'block',
            backgroundColor: '#a0aec0',
            transform: 'translate(-8px, -5px)'
          }
        },
      },
      pokemonName: null,
      counter: 0,
      requestCount: 0,
      canFetch: true,
      searchedPokemon: Object,
      firstId: 0,
      secondId: 1,
      thirdId: 2
    }
  },
  computed: {
    computedFirstId: function () {
      if (this.sliderCurrentValue === 1) {
        return 1;
      } else if (this.sliderCurrentValue === this.sliderMaxValue) {
        return this.sliderMaxValue - 2;
      } else {
        return this.sliderCurrentValue - 1;
      }
    },
    computedSecondtId: function () {
      if (this.sliderCurrentValue === 1) {
        return 2;
      } else if (this.sliderCurrentValue === this.sliderMaxValue) {
        return this.sliderMaxValue - 1;
      } else {
        return this.sliderCurrentValue;
      }
    },
    computedThirdtId: function () {
      if (this.sliderCurrentValue === 1) {
        return 3;
      } else if (this.sliderCurrentValue === this.sliderMaxValue) {
        return this.sliderMaxValue;
      } else {
        return this.sliderCurrentValue + 1;
      }
    },
  },
  methods: {
    fetchPokemonList() {
      this.requestCount++;
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
    fetchPokemonData() {
      this.requestCount++;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`)
        .then(res => {
          console.log(res);
          this.searchedPokemon = res.data;
          this.sliderCurrentValue = this.searchedPokemon.id;
          localStorage.setItem(this.pokemonName.toLowerCase(), JSON.stringify(res.data));
        })
        .catch(err => {
          this.pokemonName = 'Pokémon not found...';
        })
    },
    onSubmit() {
      if (localStorage.getItem(this.pokemonName.toLowerCase())) {
        this.searchedPokemon = JSON.parse(localStorage.getItem(this.pokemonName.toLowerCase()));
        this.sliderCurrentValue = this.searchedPokemon.id;
      } else {
        if (this.canFetch) {
          this.fetchPokemonData();
        } else {
          this.pokemonName = 'Too much requests!';
        }
      }
    },
    verifyRequestNumbers() {
      setInterval(() => {
        this.counter++;
        // console.log(this.counter);
        // console.log(this.requestCount);
        if (this.requestCount >= 95 && this.counter > 58) {
          this.canFetch = false;
        }
        if (this.counter === 60) {
          this.counter = 1;
          this.requestCount = 0;
          this.canFetch = true;
        }
      }, 1000)
    },
    getPokeImg(id) {
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';
    }
  },
  mounted() {
    this.verifyRequestNumbers();
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