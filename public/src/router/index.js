import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts.vue';
import AllPosts from '../components/All-posts.vue';
import Chatroom from '../components/Chatroom.vue';
import Post from '../components/Single-post.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      { path: '/', redirect: '/posts' },
      { path: '*', template: 'Not found' },
      { path: '/chat', component: Chatroom, name: 'chat', meta: {
          breadcrumb: 'Chat Room'
      }, },
      { path: '/contacts', name: 'contacts'},
      {
          path : '/posts',
          component: Posts,
          meta: {
              breadcrumb: 'All posts'
          },
          children: [
              {
                  path : '/',
                  component: AllPosts,
                  name: 'posts',
              },
              {
                  path : '/posts/:id',
                  component: Post,
                  name: 'post',
                  meta: {
                    breadcrumb: 'Single post'
                  }
              }
          ]
      },

  ]
})
