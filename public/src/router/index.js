import Vue from 'vue'
import Router from 'vue-router'
import Posts from '../components/Posts.vue';
import AllPosts from '../components/All-posts.vue';
import Post from '../components/Single-post.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      { path: '/', redirect: '/posts' },
      { path: '*', template: 'Not found' },
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
