<template>
  <div id="app">
    <NavbarComp />
    <footerComp />
    <!-- <SpinnerComp v-if="loading" /> -->
    <router-view />
  </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue';
import footerComp from './components/footerComp.vue';
// import SpinnerComp from './components/SpinnerComp.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    NavbarComp,
    // SpinnerComp,
  footerComp
  },
  data() {
    return {
      loading: true 
    };
  },
  // created() {
  
  //   setTimeout(() => {
  //     this.loading = false; 
  //   }, 3000); 
  // },

methods: {
    ...mapActions(['fetchUser'])
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      
      this.fetchUser();
    }
  }}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2C3E50;
}
nav a.router-link-exact-active {
  color: #42B983;
}
</style>
