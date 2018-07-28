<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: { Header, Footer }
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
  background-color #f5f5f5

*
::after
::before
  box-sizing: inherit;

#app
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>

<style lang="stylus">
.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10,10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }

  &:active:after {
    transform: scale(0,0);
    opacity: .2;
    transition: 0s;
  }
}
</style>
