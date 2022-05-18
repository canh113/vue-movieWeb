import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import moment from "moment";
moment.locale("en");
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

import funcPlugin from "./util/functions.js";
Vue.use(funcPlugin);

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import Axios from "axios";
Vue.prototype.$http = Axios.create({
  // baseURL: "https://localhost:5001",
  baseURL: "https://spp-api.scancom.net",
  timeout: 120000,
});

import user from "./store/user.js";
Vue.prototype.$user = user;

Vue.prototype.$http.interceptors.request.use(
  (config) => {
    const userStr = Vue.prototype.$func.getCookie("user-scancom");
    if (userStr) {
      let user = JSON.parse(decodeURI(userStr));
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);



new Vue({ el: '#app', router, render: h => h(App) })