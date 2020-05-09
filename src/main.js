import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Asteroids from "./components/Asteroids";
import Search from "./components/Search";
import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(VueRouter, Axios);

const routes = [
  { path: '/', component: Landing, name: 'landing'},
  { path: '/asteroids', component: Asteroids, name: 'asteroids', props: true },
  { path: '/search', component: Search, name: 'search', props: true },
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
