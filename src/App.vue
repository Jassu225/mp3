<template>
  <v-app>
    <navbar></navbar>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';
export default {
  components: {
    navbar
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
html {
  overflow: auto;
}
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5f5f56;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
