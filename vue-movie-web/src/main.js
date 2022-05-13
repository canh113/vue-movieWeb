import Vue from 'vue'
import App from './App.vue'

import moment from "moment";
moment.locale("en");
Vue.prototype.$moment = moment;

import Axios from "axios";
Vue.prototype.$http = Axios.create({
   baseURL: "https://localhost:44373/api",
  //baseURL: "https://spp-api.scancom.net",
  timeout: 120000,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
