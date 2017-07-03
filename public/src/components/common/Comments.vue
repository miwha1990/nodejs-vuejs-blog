<template>
    <section>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <app-comment-form></app-comment-form>
                <app-comment-list></app-comment-list>
            </v-flex>
        </v-layout>
    </section>
</template>
<script>
    import commentList from './Comment-List.vue';
    import commentForm from './Comment-Form.vue';
    export default {
        components: {
            appCommentList: commentList,
            appCommentForm: commentForm
        }
    }
</script>