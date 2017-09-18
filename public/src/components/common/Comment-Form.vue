<template>
    <v-card class="lighten-4">
        <v-card-text>
            <v-container>
                <form>
                    <v-layout row wrap>

                        <v-flex xs12 sm12>
                            <v-text-field multi-line v-model="form.text" label="Comment"></v-text-field>
                        </v-flex>
                        <div class="text-xs-center">
                            <button class="btn btn--light btn--raised btn--round deep-orange lighten-2 white--text" v-on:click="submitData">Submit</button>
                        </div>

                    </v-layout>
                </form>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    post_id: this.$store.getters.getPostId,
                    avatar: this.$store.getters.getAvatar,
                    text: ''
                }
            }
        },
        computed: {
            login(){return this.$store.getters.getLogin;}
        },
        methods: {
            submitData: function(event) {
                this.form.author = this.login;
                event.preventDefault();
                this.$store.dispatch('postComment', {url: this.$store.state.apiUrl+'/api/comments/', data:this.form});
            }
        }
    }
</script>