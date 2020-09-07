import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vue2TouchEvents from "vue2-touch-events";
import { VueHammer } from "vue2-hammer";
import store from "@/store";

import axios from "axios";
import { initHttp } from "@/services/api/http.init";

/* VueHammer.config.swipe = {
  treshold: 200,
}; */

Vue.use(VueHammer);

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
