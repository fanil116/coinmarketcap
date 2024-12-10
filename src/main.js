import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Trend from "vuetrend";
import moment from "moment";
import ECharts from "vue-echarts";
import VueI18n from "vue-i18n";
export const bus = new Vue();
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { store } from "./store";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.use(Trend);
Vue.use(moment);
Vue.use(ECharts);
Vue.use(VueI18n);
new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
