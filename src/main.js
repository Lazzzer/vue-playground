import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SequentialEntrance from './components/SequentialEntrance.js';
import './assets/vue-sequential-entrance.css';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

Vue.use(SequentialEntrance);
