<template>
  <main class="container loaded-header-fixed">
    <Waterfall
      :fixWidth="1024"
      :minCol="1"
      :maxCol="3"
      :gutterWidth="6"
      :gutterHeight="6"
      class="fix-waterfall"
    >
      <WaterfallItem
        v-for="(issue, index) in issues"
        :key="issue.id"
        :width="506"
        :order="index"
      >
        <div class="post-card">
          <router-link
            class="post-card-title"
            tag="a"
            :to="{
              name: 'post',
              params: {
                nodeID: issue.node_id,
                date: zuluDateSpilt(issue.created_at)
              }
            }"
          >
            {{ issue.title }}
          </router-link>
          <img class="banner" v-if="matchFirstImage(issue.body_html)" :src="matchFirstImage(issue.body_html)">
          <div class="post-card-body">
            <div class="text">{{ issue.body_text }}</div>
             <router-link
                class="post-card-read-action"
                tag="a"
                :to="{
                  name: 'post',
                  params: {
                    nodeID: issue.node_id,
                    date: zuluDateSpilt(issue.created_at)
                  }
                }"
              >
                阅读全文&nbsp;&raquo;
             </router-link>
          </div>
        </div>
      </WaterfallItem>
    </Waterfall>
  </main>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import { issues } from "../api/github-v3";
export default {
  components: { Waterfall, WaterfallItem },
  data: () => ({
    issues: []
  }),
  methods: {
    zuluDateSpilt(value) {
      return value.match(
        /^([1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))T.*Z$/is
      )[1];
    },
    matchFirstImage(html) {
      let match = html.match(/(\<img.*?src=\"(.*?)\".*?\/?\>)/);

      if (!match) {
        return null
      }

      return match[2] || null;
    }
  },
  created() {
    issues(1).then(response => {
      this.issues = response.data;
    });
  }
};
</script>

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
    padding-top 24px
  
  .fix-waterfall
    z-index 0
.post-card
  padding 40px;
  background-color #fff
  position relative

  .banner
    width 100%;

  .post-card-title
    color #2c3e50
    outline none
    text-decoration none
    font-size 16px
    line-height 200%
  
  .post-card-body
    font-size 14px
    color #7f8c8d
    position relative
    overflow hidden
    max-height 84px

    .text
      word-break break-all
      word-wrap break-word
    
    .post-card-read-action
      position absolute
      top 65px
      right 0
      height 18px
      line-height 18px
      background-color #fff
      box-shadow 0 22px 16px 20px #fff;
      padding-left 12px
</style>
