import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue';
import Post from '../components/Single-post.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      { path : '/', component: Home},
      { path : '/post/:id', component: Post, name: 'post'}
  ]
})
