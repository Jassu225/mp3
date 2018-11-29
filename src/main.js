import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import {VueMasonryPlugin} from 'vue-masonry';
import store from './store';
import router from './router';

require("babel-core/register");
require("babel-polyfill");


Vue.use(Vuetify);
Vue.use(VueMasonryPlugin);

import 'vuetify/dist/vuetify.min.css';

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
