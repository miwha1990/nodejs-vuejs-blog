<template>
  <v-app id="main">
    <app-header></app-header>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Header from './components/common/Header.vue'
  export default {
    name: 'main',
    components: {
        appHeader: Header
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
</style>
