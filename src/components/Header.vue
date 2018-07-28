<template>
    <header class="header">
        <div class="container">
            <a class="logo" href="">
                <img src="../assets/logo.svg" alt="">
                <!-- <h3></h3> -->
            </a>
            <nav class="menu">
                <a class="menu-item" href="">All Posts</a>
                <a class="menu-item" href="">Categories</a>
                <Search />
            </nav>
            <div class="user">
                <button class="login-button ripple" type="button">Login</button>
            </div>
        </div>
    </header>
</template>

<script>
import Search from "./Search";
export default {
  components: { Search }
};
</script>

<style lang="stylus">
.header
    width 100%
    background-color #3c4146
    border-bottom-color #202326
    color #fff
    padding 25px
    box-sizing border-box
    position fixed
    top 0
    z-index 100

    @media screen and (min-width 1024px)
        height 85px;
        padding 25px 0
        
    a
        color #fff
        text-decoration none

    .container
        width 1024px
        margin 0 auto
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        padding 0

        @media screen and (max-width: 1024px)
            width 100%;

        .logo
            display flex

            img
                max-height 35px
                margin-right 12px

            h3
                font-size 18px
                margin-top 4px

        .menu
            width 100%
            display flex
            flex-direction row
            justify-content flex-end
            align-items center
            margin 0 24px

            .menu-item
                position: relative
                margin-left 20px
                &:hover
                    color: rgba(255,255,255,.7)
        
        .login-button
            font-size 16px
            font-weight 400
            border none
            background-color transparent
            color #fff
            padding 8px 15px
            cursor pointer
            outline none
</style>
