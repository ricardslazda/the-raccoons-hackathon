import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Asteroids from "./components/Asteroids";
import Search from "./components/Search";
import Cobalt from "./components/Cobalt";
import Iron from "./components/Iron";
import Aluminium from "./components/Aluminium";
import Ammonia from "./components/Ammonia";
import Hydrogen from "./components/Hydrogen";
import Nickel from "./components/Nickel";
import Nife from "./components/Nife";
import Nitrogen from "./components/Nitrogen";
import Fesio from "./components/FeSiO";
import Mgosi from "./components/MgOSi";
import Water from "./components/Water";
import Platinum from "./components/Platinum";
import VModal from "vue-js-modal";
import {SidebarPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(VueRouter, Axios);
Vue.use(SidebarPlugin);

const routes = [
  { path: '/', component: Landing, name: 'landing'},
  { path: '/asteroids', component: Asteroids, name: 'asteroids', props: true },
  { path: '/search', component: Search, name: 'search', props: true },
  { path: '/cobalt', component: Cobalt, name: 'cobalt', props: true },
  { path: '/iron', component: Iron, name: 'iron', props: true },
  { path: '/aluminium', component: Aluminium, name: 'aluminium', props: true },
  { path: '/platinum', component: Platinum, name: 'platinum', props: true },
  { path: '/water', component: Water, name: 'water', props: true },
  { path: '/nitrogen', component: Nitrogen, name: 'nitrogen', props: true },
  { path: '/nife', component: Nife, name: 'nife', props: true },
  { path: '/fesio', component: Fesio, name: 'fesio', props: true },
  { path: '/mgosi', component: Mgosi, name: 'mgosi', props: true },
  { path: '/nickel', component: Nickel, name: 'nickel', props: true },
  { path: '/hydrogen', component: Hydrogen, name: 'hydrogen', props: true },
  { path: '/ammonia', component: Ammonia, name: 'ammonia', props: true },
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
