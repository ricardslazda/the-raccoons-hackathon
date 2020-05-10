import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import Axios from "axios";
import Landing from "./components/Landing";
import Asteroids from "./components/Asteroids";
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

];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
