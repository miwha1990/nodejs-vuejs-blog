import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
        title: '',
        posts:[],
        postId:'',
        comments:'',
        route: '',
        totalItems:0
     },
     mutations: {
         CHANGE_TITLE(state, payload) {
             state.title = payload;
         },
         SET_POSTS(state, response) {
             console.log('fired');
             state.posts = response.body.data;
         },
         SET_COMMENTS(state, response) {
             state.comments = response.body.data;
         },
         SET_POST_ID(state, id) {
             state.postId = id;
         },
         ADD_POST(state, body) {
             state.posts.unshift(body.data);
         },
         ADD_COMMENT(state, comment) {
             state.comments.unshift(comment.body.data);
         },
         SET_ROUTE(state, route) {
             state.route = route;
         },
         SET_TOTAL_ITEMS(state, total) {
             state.totalItems = total;
         }
     },
     getters: {
         getTitle(state) {
             return state.title;
         },
         getComments(state) {
             return state.comments;
         },
         getPosts(state) {
             return state.posts;
         },
         getPostId(state) {
             return state.postId;
         },
         getRoute(state) {
             return state.route;
         },
         getTotalItems(state) {
             return state.totalItems;
         }
     },
     actions: {
         fetchPosts(context, url) {
            Vue.http.get(url)
                .then(async (response)=>{

                    if(Array.isArray(response.body.data)){

                        await response.body.data.map(async el => {

                             Vue.http
                                .get('http://localhost:8000/api/comments/' + el._id + '/count_all')
                                .then(e => {
                                    Vue.set(el, 'comments', e.body.data.length)
                                });
                        });
                    }
                    context.commit("SET_POSTS", response)
                })
                .catch((err) => console.log(err));
         },
         fetchComments(context, url) {
             Vue.http.get(url)
                 .then((response)=>context.commit("SET_COMMENTS", response))
                 .catch((err) => console.log(err));
         },
         postComment(context, data) {
             Vue.http.post(data.url, JSON.stringify(data.data))
                 .then((response)=>context.commit("ADD_COMMENT", response))
                 .catch((err) => console.log(err));
         }

     }
});

