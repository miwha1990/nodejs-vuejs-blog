import Vue from 'vue'
import router from './router'
import App from './App.vue';
import store from './store';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';

Vue
    .use(Vuetify)
    .use(VueResource);


new Vue({
  el: '#app',
  router,
  store,
  component: App,
  render: h => h(App),
  mounted() {
  }
});
