<template>
  <v-app id="main">
    <app-header></app-header>
    <router-view :key="$route.fullPath"></router-view>
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
        this.$store.dispatch('authenticate');
      }
  }
</script>

<style>
  #main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: rgba(0,0,0,0.07);
  }
  html{
    overflow: visible;
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
