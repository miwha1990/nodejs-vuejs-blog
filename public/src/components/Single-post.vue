<template>
    <div class="single-template">
        <v-container>
            <v-layout row wrap >
                <v-flex xs12 md7 offset-md1 class="main">
                    <article>
                        <h1 class="deep-orange--text text--lighten-2">{{postData.title}}</h1>
                        <p style="margin-left: 20px">
                            <v-chip outline class="blue blue--text">
                                <v-icon >person</v-icon> Author: {{postData.author}}
                            </v-chip>
                            <v-chip outline class="blue blue--text">
                                <v-icon >date_range</v-icon>Published: {{postData.date}}
                            </v-chip>
                            <v-chip outline class="blue blue--text">
                                <v-icon >clear_all</v-icon>Category: {{postData.category}}
                            </v-chip>
                        </p>
                        <div class="content_part">
                        <span class="article_img" v-if="postData.imageUrl !== 'null'">
                            <img v-bind:src="postData.imageUrl">
                        </span>
                        <span class="article_img" v-else>
                            <img src="http://lorempixel.com/380/295/">
                        </span>
                        <span class="post_content">
                            <p>{{postData.content}}</p>
                            <div style="clear:both"></div>
                        </span>
                        </div>
                        <div style="clear:both"></div>
                    </article>

                    <app-comments-block></app-comments-block>
                </v-flex>
                <v-flex md3 class="sidebar">
                    <sidebar></sidebar>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>
<script>
    import CommentsBlock from './common/Comments.vue';
    import Sidebar from './common/Sidebar.vue';
    export default {
        methods: {

        },
        computed: {
            postData() {
                return this.$store.getters.getPosts;
            }
        },
        created(){
            this.$store.dispatch('fetchPosts', 'http://localhost:8000/api/posts/'+this.$route.params.id);
            this.$store.commit('SET_POST_ID', this.$route.params.id);
        },
        mounted() {
            const title = 'Single post';
            this.$store.commit('CHANGE_TITLE',title);
        },
        components: {
            appCommentsBlock: CommentsBlock,
            sidebar: Sidebar,
        }
    }
</script>
<style scoped>
    .article_img{
        display: block;
        max-width: 500px;
        max-height: 400px;
        position: relative;
        float: left;
        margin: 0 20px;
    }
    .article_img img{
        width: 100%;
        object-fit: cover;
    }
    .single-template .sidebar{
        margin-left: 50px;
    }
    .single-template article{
        background: white;
        box-shadow: 0 3px 10px rgba(0,0,0,.23), 0 3px 10px rgba(0,0,0,.16);
    }
    .single-template article{
        padding-top: 10px;
    }

    h1{
        font-size: 4em;
        margin:20px
    }
    .post_content{
        font-size: 1.5em;
        text-indent: 40px;
        padding-bottom: 20px;
    }
    .content_part{
        padding-bottom: 20px;
        margin-bottom: 50px;
    }
</style>