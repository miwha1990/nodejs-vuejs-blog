<template>
    <main>
        <app-breadcrums></app-breadcrums>
        <router-view></router-view>
    </main>
</template>
<script>

    import Breadcrumbs from './common/Breadcrumbs.vue';
    export default {
        name: 'main',
        components: {
            appBreadcrums: Breadcrumbs
        },
        created() {
            this.$store.dispatch('authenticate');
            this.$store.commit("SET_ROUTE", this.$route);
        }
    }
</script>