<template>
    <v-breadcrumbs divider="/">
        <v-breadcrumbs-item
                v-for="(crumb, key) in crumbs"
                :key="key"
                :disabled="crumb.disabled"
        >
            <router-link :to="{ path: crumb.path} ">
                {{crumb.meta.breadcrumb}}
            </router-link>
        </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>
<script>

    export default {
        computed: {
            crumbs() {
                const crumbs = [];
                for (let i = 0; i < this.$route.matched.length; i++) {
                    if (this.$route.matched[i].meta && this.$route.matched[i].meta.breadcrumb) {
                        crumbs.push(this.$route.matched[i])
                    }
                    if(i + 1 === this.$route.matched.length) {
                        crumbs[crumbs.length -1].path = this.$route.path;
                    }
                }
                return crumbs;
            }
        }
    }
</script>