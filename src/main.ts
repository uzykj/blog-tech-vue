import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import '../public/css/hover.css'
import '../public/css/card.css'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
