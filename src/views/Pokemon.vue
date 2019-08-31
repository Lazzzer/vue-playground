<template>
  <div class="h-screen">
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      pokemonList: [],
      sliderMaxValue: Number
    }
  },
  methods: {
    fetchPokemonList() {
      axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
        .then(res => {
          console.log(res);
          this.sliderMaxValue = res.data.count - 1;
          this.pokemonList = res.data.results;
          localStorage.setItem('pokemonList', JSON.stringify(res.data.results));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (localStorage.getItem('pokemonList')) {
      try {
        this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        this.sliderMaxValue = this.pokemonList.length - 1;
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