import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import '../public/css/hover.css';
import '../public/css/card.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

// 自定义全局指令

// display控制
Vue.directive('town-display', {
  bind(el, bind){
    if(bind.value){
      el.style.display = bind.value;
    }
  },
  update(el, bind){
    if(bind.value){
      el.style.display = bind.value;
    }
  }
});

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
