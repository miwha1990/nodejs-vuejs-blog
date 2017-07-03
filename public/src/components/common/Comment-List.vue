<template>
    <v-card>
        <v-list two-line>
            <template v-for="item in comments">
                <v-divider></v-divider>
                <v-list-item v-bind:key="item.id">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/no-avatar.png">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.author"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.Created_date"></v-list-tile-sub-title>
                            <v-list-tile-title v-html="item.text"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</template>
<script>
    export default {
        computed: {
            comments() {
                const arr = this.$store.getters.getComments
                return arr;
            }
        },
        mounted() {
            this.$store.dispatch('fetchComments', 'http://localhost:8000/api/comments/'+this.$store.getters.getPostId);
        }
    }
</script>