<template>
    <label class="search-container menu-item">
        <input
            class="search-control"
            type="text"
            placeholder="Search…"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
        >
    </label>
</template>

<style lang="stylus">
.search-container
    position: relative;
    margin-right 24px

    .search-control
        width 160px
        padding: 2px 5px 2px 25px
        font-weight: 400
        border-width 0
        background: url(../assets/search.png) 8px center no-repeat #202326
        transition: width .3s ease-in-out 0s
        min-height: 34px
        font-size: 14px
        line-height: 20px
        vertical-align: middle
        border-radius: 3px
        outline: 0
        box-shadow: inset 0 1px 2px rgba(0,0,0,.075)
        color: #fff

        &:focus
            width 210px
            box-shadow: inset 0 1px 2px rgba(0,0,0,.075), 0 0 6px rgba(0,121,209,.5)

        @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi)
                background-image: url(../assets/search@2x.png)
                background-size: 13px 13px
</style>
