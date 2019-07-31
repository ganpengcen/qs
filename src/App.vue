<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0 0;
  padding: 0 0;
}
html,body{
  height: 100%;
  background-color: #f4f4f4;
  margin: 0 0;
  padding: 0 0;
  /* overflow:scroll auto; */
}
</style>
