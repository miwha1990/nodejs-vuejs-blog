import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
        title: '',
        posts:[],
        postId:'',
        comments:'',
        totalItems:0,
        login:false,
        avatar:false,
        apiUrl:'https://intense-garden-59155.herokuapp.com'
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
         ADD_POST(state, body) {
             state.posts.unshift(body.data);
         },
         ADD_COMMENT(state, comment) {
             state.comments.unshift(comment.body.data);
         },
         SET_TOTAL_ITEMS(state, total) {
             state.totalItems = total;
         },
         CHANGE_LOGIN_STATE(state, switcher) {
             state.login = switcher;
         },
         CHANGE_AVATAR_STATE(state, switcher) {
             if(switcher) {
                 state.avatar = state.apiUrl + switcher;
             } else {
                 state.avatar = switcher;
             }

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
         getTotalItems(state) {
             return state.totalItems;
         },
         getLogin(state) {
             return state.login
         },
         getAvatar(state) {
             return state.avatar
         }
     },
     actions: {
         fetchPosts(context, url) {

            Vue.http.get(url)
                .then(async (response)=>{

                    if(Array.isArray(response.body.data)){

                        await response.body.data.map(async el => {

                             Vue.http
                                .get(context.state.apiUrl + '/api/comments/' + el._id + '/count_all')
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
         },

         login(context, data ){
             return Vue.http.post(data.url, JSON.stringify(data.data))
                 .then((response)=>{
                     Vue.cookie.set('token', response.data.data);
                     return response.data;
                 })
                 .catch((err) => {return err});
         },
         logout(context) {
             Vue.cookie.delete('token');
             context.commit("CHANGE_LOGIN_STATE", false);
         },
         register(context, data) {
             return Vue.http.post(data.url, JSON.stringify(data.data))
                 .then((response)=>{
                     return response.data;
                 })
                 .catch((err) => {return err});
         },
         authenticate(context) {

             const token = Vue.cookie.get('token');
             if(token) {
                 return Vue.http.get(context.state.apiUrl + '/me/', {
                     headers: {
                         Authorization: `JWT ${token}`
                     }})
                     .then((response)=>{
                         context.commit("CHANGE_LOGIN_STATE", response.body.data.firstName);
                         context.commit("CHANGE_AVATAR_STATE", response.body.data.avatar);
                         return response.body;
                     })
                     .catch(err => err);
             }
         }
     }
});

