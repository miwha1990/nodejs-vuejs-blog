<template>
    <main>
        <v-container>
            <v-layout row wrap >
                <v-flex xs1 offset-xs1>
                        {{postData.Created_date}}
                </v-flex>
                <v-flex xs10>
                    <h3>{{postData.title}}</h3>
                    <p>{{postData.content}}</p>
                </v-flex>
            </v-layout>
        </v-container>
        <app-comments-block></app-comments-block>
    </main>
</template>
<script>
    import CommentsBlock from './common/Comments.vue';
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
            appCommentsBlock: CommentsBlock
        }
    }
</script>
<style>
    main{
        padding-top:100px;
    }
</style>