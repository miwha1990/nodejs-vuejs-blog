<template>
    <main>
        <v-container>
            <v-layout row wrap  v-for="item in posts" :key="item._id">
                <v-flex xs1 offset-xs1>
                    {{item.Created_date}}
                </v-flex>
                <v-flex xs10>
                    <router-link :to="{ path: 'post/'+item._id }" tag="h3">{{item.title}}</router-link>
                    <p>{{item.content}}</p>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            posts() {
                return this.$store.getters.getPosts;
            }
        },
        created(){

        },
        mounted() {
            this.$store.commit('CHANGE_TITLE', 'Home');
            this.$store.dispatch('fetchPosts', 'http://localhost:8000/api/posts');
        }
    }
</script>
<style>
    h3{
        cursor: pointer;
    }
    main{
        padding-top:100px;
    }
</style>