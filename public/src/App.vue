<template>
  <v-app id="main">
    <app-header></app-header>
    <app-breadcrums></app-breadcrums>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Header from './components/common/Header.vue';
  import Breadcrumbs from './components/common/Breadcrumbs.vue';
  export default {
    name: 'main',
    components: {
        appHeader: Header,
        appBreadcrums: Breadcrumbs
    },
      created() {
        this.$store.commit("SET_ROUTE", this.$route);
      }
  }
</script>

<style>
  #main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .container{
    width: 80%;
    margin:auto;
  }
  @media screen and (max-width: 768px){
    .container{
      width: 100%;
      margin:auto;
    }
  }
</style>
