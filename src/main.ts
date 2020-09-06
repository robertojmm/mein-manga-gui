import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vue2TouchEvents from "vue2-touch-events";

import store from "@/store";

import axios from "axios";
import { initHttp } from "@/services/api/http.init";

Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

function initVue() {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
}

axios
  .get("/settings.json")
  .then(async ({ data }) => {
    initHttp(data.authority);
    await store.dispatch("setAuthority", data.authority);
  })
  .then(initVue);
