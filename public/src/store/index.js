import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
        title: '',
        posts:[],
        postId:'',
        comments:'',
        route: ''
     },
     mutations: {
         CHANGE_TITLE(state, payload) {
             state.title = payload;
         },
         SET_POSTS(state, response) {
             state.posts = response.body.data;
         },
         SET_COMMENTS(state, response) {
             state.comments = response.body.data;
         },
         SET_POST_ID(state, id) {
             state.postId = id;
         },
         ADD_COMMENT(state, comment) {
             state.comments.unshift(comment.body.data);
         },
         SET_ROUTE(state, route) {
             state.route = route;
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
         }
     },
     actions: {
         fetchPosts(context, url) {
            Vue.http.get(url)
                .then((response)=>{

                    if(Array.isArray(response.body.data)){
                        response.body.data.map(el => {

                            Vue.http.get('http://localhost:8000/api/comments/' + el._id)
                                .then((comments)=>{
                                    el.comments = comments.body.data.length;

                                    // TODO: Remove that from cycle
                                    context.commit("SET_POSTS", response)
                                })
                                .catch((er) => console.log(er));
                        });
                    } else {
                        context.commit("SET_POSTS", response)
                    }
                })
                .catch((err) => console.log(err));
         },
         fetchComments(context, url) {
             Vue.http.get(url)
                 .then((response)=>{
                 console.log(response);
                     context.commit("SET_COMMENTS", response) //response is the new friend
                 })
                 .catch((err) => console.log(err));
         },
         postComment(context, data) {
             Vue.http.post(data.url, JSON.stringify(data.data))
                 .then((response)=>{
                     context.commit("ADD_COMMENT", response)
                 })
                 .catch((err) => console.log(err));
         }

     }
});

