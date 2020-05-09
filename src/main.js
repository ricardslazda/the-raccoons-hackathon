import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Search from "./components/Search";
import Asteroid from "./components/Asteroid";
import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(VueRouter, Axios);

const routes = [
  { path: '/', component: Landing, name: 'landing'},
  { path: '/asteroids/:id', component: Asteroid, name: 'asteroid', props: true },
  { path: '/search', component: Search },
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
