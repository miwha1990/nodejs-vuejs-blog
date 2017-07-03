<template>
    <v-card class="lighten-4">
        <v-card-text>
            <v-container>
                <form>
                    <v-layout row wrap>

                        <v-flex xs12 sm12>
                            <v-text-field type="text" v-model="form.author" label="Name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12>
                            <v-text-field multi-line v-model="form.text" label="Comment"></v-text-field>
                        </v-flex>
                        <div class="text-xs-center">
                            <button class="btn btn--light btn--raised btn--round primary" v-on:click="submitData">Submit Comment</button>
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
                    author: '',
                    text: ''
                }
            }
        },
        methods: {
            submitData: function(event) {
                event.preventDefault();
                this.$store.dispatch('postComment', {url: 'http://localhost:8000/api/comments/', data:this.form});
            }
        }
    }
</script>