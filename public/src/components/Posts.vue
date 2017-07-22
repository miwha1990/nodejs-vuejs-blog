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
        }
    }
</script>
