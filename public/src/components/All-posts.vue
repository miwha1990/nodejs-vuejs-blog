<template>
    <v-container>
        <v-layout row wrap  v-for="item in posts" :key="item._id" class="post_list">
            <v-flex xs12 md10 offset-md1>
                <v-card>
                    <v-layout row wrap>
                        <v-flex xs12 md4 >
                            <div class="article_img">
                                <img v-bind:src="item.imageUrl">
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
                                        <v-icon >forum</v-icon>&nbsp;<div v-html="item.comments?item.comments.toString():''"></div>&nbsp;comments
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
        </v-layout>
        <app-pagination :total="totalItems" :limit="postPerPage" :page="pageIndex" @update:page="val => pageIndex = val" v-on:updatePageIndex="changePage"></app-pagination>
        <app-modal></app-modal>
    </v-container>
</template>
<script>
    import pagination from './common/Pagination.vue';
    import modal from './common/Modal-add-post.vue';
    export default {
        data() {
            return {
                totalItems:0,
                pageIndex:0,
                postPerPage:4,
            }
        },
        computed: {
            posts() {
                return this.$store.getters.getPosts;
            }
        },
        methods: {
            changePage(e) {
                clearTimeout(timeout);
                this.pageIndex = e;
                const timeout = setTimeout(()=>{
                    this.$store.dispatch('fetchPosts', `http://localhost:8000/api/posts?page=${this.pageIndex}&limit=${this.postPerPage}`);
                },500);
            }
        },
        mounted() {
            this.$store.commit('CHANGE_TITLE', 'Posts');
            this.$store.dispatch('fetchPosts', `http://localhost:8000/api/posts?page=${this.pageIndex}&limit=${this.postPerPage}`);
            this.$http.get(
                'http://localhost:8000/api/posts/count_all'
            ).then((res) => {
                this.totalItems = res.body.data;
            });
        },
        components: {
            appPagination : pagination,
            appModal: modal
        }
    }
</script>
<style >
    #add_button{
        position: fixed;
        right: 5%;
        bottom:5%
    }
    .post_list{
        margin-bottom: 30px;
    }
    h4 {
        cursor: pointer;
        color: orange;
    }
    a{
        text-decoration: none;
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