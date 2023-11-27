<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  mounted() {
    document.body.style.margin = '0';
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: url("../public/login-bg.jpg");
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
}
</style>
