import Vue from 'vue';
import App from './App.vue';
import './tailwind.css';

import router from './router';
import VueRouter from 'vue-router';
import store from '@/store/index.js'

import VCalendar from 'v-calendar';

Vue.use(VueRouter);
Vue.use(VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
});

Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount('#app');
