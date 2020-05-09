import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Planet from "./components/Planet";
import Search from "./components/Search";
import Asteroid from "./components/Asteroid";

Vue.use(VueRouter, Axios);

const routes = [
  { path: '/', component: Landing, name: 'landing'},
  { path: '/planets/:planet', component: Planet, name: 'planet', props: true },
  { path: '/asteroids/:id', component: Asteroid, name: 'asteroid', props: true },
  { path: '/search', component: Search }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
