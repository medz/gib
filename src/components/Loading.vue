<template>
    <div class="loading">
        <div class="bounce-one"></div>
        <div class="bounce-two"></div>
    </div>
</template>

<style lang="stylus">
@keyframes bounce
    0%
    100%
        transform scale(0.0)
    50%
        transform scale(1.0)
.loading
    width 60px;
    height 60px;
    position relative
    margin 100px auto
    .bounce-one
    .bounce-two
        width 100%;
        height 100%;
        border-radius 50%
        background-color #67CF22
        opacity .6
        position absolute
        top 0
        left 0
        animation bounce 2s infinite ease-in-out
    .bounce-two
        animation-delay -1s
</style>

