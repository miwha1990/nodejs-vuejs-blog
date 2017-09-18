<template>
    <v-container>
        <v-layout row wrap wrapclass="post_list">
            <v-flex sm12 md7 offset-md1>
                <div class="no_posts" v-if="!posts.length">
                    <h4 class="deep-orange--text text--lighten-2 text-xs-center">Sorry! No posts yet!</h4>
                </div>
                <v-card v-else class="post_card"   v-for="item in posts" :key="item._id" >
                    <v-layout row wrap>
                        <v-flex xs12 md4 >

                            <div class="article_img" v-if="item.imageUrl != null">
                                <img v-bind:src="apiUrl+item.imageUrl">
                            </div>
                            <div class="article_img" v-else>
                                <img src="http://lorempixel.com/380/290/">
                            </div>
                            <v-chip class="white" label>{{item.category}}</v-chip>
                        </v-flex>
                        <v-flex xs12 md8 >
                            <v-card-text>
                                <router-link :to="{ name: 'post', params: { id:item._id } }" tag="h4" class="deep-orange--text text--lighten-2">{{item.title}}</router-link>
                                <p>
                                    <v-chip outline class="blue blue--text">
                                        <v-icon >person</v-icon> Author: {{item.author}}
                                    </v-chip>
                                    <v-chip outline class="blue blue--text">
                                        <v-icon >date_range</v-icon> {{item.date}}
                                    </v-chip>
                                    <v-chip outline class="blue blue--text">

                                        <v-icon >forum</v-icon>&nbsp;<div v-html="item.comments?item.comments.toString():'0'"></div>&nbsp;comments
                                    </v-chip>
                                </p>
                                <p>
                                    {{item.content}}
                                </p>
                                <p class="text-right">
                                    <router-link :to="{ name: 'post', params: { id:item._id } }">
                                        <v-btn class="deep-orange lighten-2 white--text" light>Read More</v-btn>
                                    </router-link>
                                </p>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex sm12 md3  class="sidebar">
                <sidebar></sidebar>
            </v-flex>
        </v-layout>
        <app-pagination :limit="postPerPage" :page="pageIndex" v-on:updatePageIndex="changePage"></app-pagination>
        <app-modal v-if="logged"></app-modal>
    </v-container>
</template>
<script>
    import pagination from './common/Pagination.vue';
    import Sidebar from './common/Sidebar.vue';
    import modal from './common/Modal-add-post.vue';
    export default {
        data() {
            return {
                pageIndex:0,
                postPerPage:4,
                apiUrl:this.$store.state.apiUrl
            }
        },

        beforeRouteEnter (to, from, next) {
            const category = to.query.category;
            next(vm => {
                if(category === 'All' || !category){
                    vm.fetchData();
                } else {vm.fetchData(category); }
            })

        },
        beforeRouteUpdate (to, from, next) {
            const category = to.query.category;
            this.pageIndex = 0;
            if(category === 'All'){
                this.fetchData();
            } else {
                this.fetchData(category);
            }
            next();

        },
        computed: {
            posts() {
                return this.$store.getters.getPosts;
            },
            logged() {
                return this.$store.getters.getLogin;
            }
        },
        methods: {
            changePage(e) {
                clearTimeout(timeout);
                this.pageIndex = e-1;
                const timeout = setTimeout(()=>{
                    const cat = this.$route.query.category;
                    if(cat && cat !== 'All'){
                        this.fetchData(cat);
                    } else {
                        this.fetchData();
                    }
                },500);
            },
            fetchData (cat) {
                const category = cat ? '&category='+cat : '';
                const category_count = cat ? '?category='+cat : '';
                const url = `${this.$store.state.apiUrl}/api/posts?page=${this.pageIndex}&limit=${this.postPerPage}${category}`;

                this.$http.get(
                    this.$store.state.apiUrl+'/api/posts/count_all'+category_count
                ).then((res) => {
                    this.$store.commit('SET_TOTAL_ITEMS', res.body.data);
                });
                this.$store.dispatch('fetchPosts', url);
            }
        },
        mounted() {
            this.$store.commit('CHANGE_TITLE', 'Posts');
        },
        components: {
            appPagination : pagination,
            appModal: modal,
            sidebar: Sidebar
        }
    }
</script>
<style >
    h4{
        cursor: pointer;
    }
    #add_button{
        position: fixed;
        right: 5%;
        bottom:5%
    }
    .post_card{
        margin-bottom: 30px;
    }
    a{
        text-decoration: none;
    }
    .sidebar{
        margin-left: 50px;
    }

    .article_img{
        height: 100%;
        position: relative;
    }
    .article_img img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    .white.chip{
        position: absolute;
        top:20px;
        left:20px;
    }
</style>