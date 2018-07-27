<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: { Header }
};
</script>


<style lang="stylus">
html
body
*
  padding 0
  margin 0

body
  font-size: 16px
  line-height: 1.5
  color: #767676

*
::after
::before
  box-sizing: inherit;

body
  background-color #fff

#app
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
