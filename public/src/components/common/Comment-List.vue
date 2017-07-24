<template>
    <v-card v-if="comments.length">
        <v-list two-line>
            <template v-for="item in comments">
                <v-list-item v-bind:key="item.id">
                    <v-list-tile avatar>
                        <v-list-tile-avatar v-on:click="onInfinite()">
                            <img src="../../assets/no-avatar.png">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.author"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.Created_date"></v-list-tile-sub-title>
                            <v-list-tile-title v-html="item.text"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-item>
                <v-divider></v-divider>
            </template>
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
        </v-list>
    </v-card>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        data() {
            return {
                page: 0,
            }
        },
        computed: {
            comments() {
                return this.$store.getters.getComments;
            }
        },
        methods: {
            onInfinite() {
                console.log(this.comments.length);
                if(this.comments.length > 4) {
                    this.$http.get(
                        this.$store.state.apiUrl+'/api/comments/'+this.$store.getters.getPostId+'/'+(++this.page)
                    ).then((res) => {
                        setTimeout(() => {
                            if (res.body.data.length) {
                                this.comments.push(...res.body.data);
                                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                            } else {
                                if(this.comments.length) {
                                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                                } else {
                                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                                }
                            }
                        },500);
                    });
                }
            },
        },
        mounted() {
            this.$store.dispatch('fetchComments', this.$store.state.apiUrl+'/api/comments/'+this.$store.getters.getPostId+'/'+this.page);
        },
        components: {
            InfiniteLoading,
        },
    }
</script>