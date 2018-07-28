<template>
  <main class="container loaded-header-fixed">Main.</main>
</template>

<style lang="stylus">
.container
  width 1024px
  margin 0 auto
  box-sizing border-box

  @media screen and (max-width 1024px)
    width 100%;
    padding-left 24px
    padding-right 24p

  &.loaded-header-fixed
    margin-top 85px
</style>
