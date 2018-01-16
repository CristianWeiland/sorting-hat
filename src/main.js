import Vue from 'vue';
import App from './app.vue';

// import ChartJS from 'chart.js';
import BootstrapVue from 'bootstrap-vue';

// Vue.use(ChartJS);
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
});