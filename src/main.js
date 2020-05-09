import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Asteroid from "./components/Asteroid";
import Asteroids from "./components/Asteroids";

Vue.use(VueRouter, Axios);

const routes = [
  { path: '/', component: Landing, name: 'landing'},
  { path: '/asteroids/:id', component: Asteroid, name: 'asteroid', props: true },
  { path: '/asteroids', component: Asteroids }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
