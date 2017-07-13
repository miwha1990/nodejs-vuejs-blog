<template>
    <section>
        <h5>Comments</h5>
        <app-comment-form v-if="login"></app-comment-form>
        <app-comment-list></app-comment-list>
    </section>
</template>
<script>
    import commentList from './Comment-List.vue';
    import commentForm from './Comment-Form.vue';

    export default {
        data() {
            return {

            }
        },
        computed: {
          login(){return this.$store.getters.getLogin;}
        },
        components: {
            appCommentList: commentList,
            appCommentForm: commentForm
        }
    }
</script>
<style>
.card{
    box-shadow: 0 3px 10px rgba(0,0,0,.23), 0 3px 10px rgba(0,0,0,.16);
}
</style>