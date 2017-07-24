import Vue from 'vue'
import router from './router'
import App from './App.vue';
import store from './store';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import VueSocketio from 'vue-socket.io';

Vue
    .use(Vuetify)
    .use(VueCookie)
    .use(VueSocketio, store.state.apiUrl, store)
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
