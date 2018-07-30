<template>
  <main class="container loaded-header-fixed">
    <Waterfall
      :fixWidth="1024"
      :minCol="2"
      :maxCol="2"
      :gutterWidth="6"
      :gutterHeight="6"
      class="fix-waterfall"
      v-show="!loading"
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
                number: encodeBase64(issue.number),
                date: zuluDateSplit(issue.created_at)
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
                    number: encodeBase64(issue.number),
                    date: zuluDateSplit(issue.created_at)
                  }
                }"
              >
                阅读全文&nbsp;&raquo;
             </router-link>
          </div>
        </div>
      </WaterfallItem>
    </Waterfall>
    <Loading v-show="loading" />
    <div class="pagination">
      <router-link
        :class="[
          'page-item',
          {
            disabled: !first,
            ripple: first
          }
        ]"
        tag="a"
        rel="nofollow"
        :disabled="!first"
        :to="{ name: 'posts', query: { page: first } }"
      >
        First
      </router-link>
      <router-link
        :class="[
          'page-item',
          {
            disabled: !prev,
            ripple: prev
          }
        ]"
        tag="a"
        rel="nofollow"
        :disabled="!prev"
        :to="{ name: 'posts', query: { page: prev } }"
      >
        Prev
      </router-link>
      <router-link
        :class="[
          'page-item',
          {
            ripple: next,
            disabled: !next
          }
        ]"
        :disabled="!next"
        tag="a"
        rel="nofollow"
        :to="{ name: 'posts', query: { page: next } }"
      >
        Next
      </router-link>
      <router-link
        :class="[
          'page-item',
          {
            ripple: last,
            disabled: !last
          }
        ]"
        :disabled="!last"
        tag="a"
        rel="nofollow"
        :to="{ name: 'posts', query: { page: last } }"
      >
        Last
      </router-link>
    </div>
  </main>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import Loading from "../components/Loading";
import { issues } from "../api/github-v3";
export default {
  components: { Waterfall, WaterfallItem, Loading },
  data: () => ({
    loading: true,
    issues: [],
    page: 1,
    first: 0,
    prev: 0,
    next: 0,
    last: 0
  }),
  watch: {
    $route(newRoute) {
      this.fetchIssues(newRoute.query.page || 1);
    }
  },
  methods: {
    zuluDateSplit(value) {
      if (!value) {
        return 0;
      }

      return value.match(/([0-9]{4}-[0-9]{2})-.*?T.*?Z/is)[1];
    },
    encodeBase64(id) {
      return btoa(`issue@number:${id}`);
    },
    matchFirstImage(html) {
      if (!html) {
        return null;
      }

      let match = html.match(/(<img.*?src="(.*?)".*?\/?>)/);

      if (!match) {
        return null;
      }

      return match[2] || null;
    },
    fetchIssues(page) {
      this.loading = true;
      this.issues = [];
      issues(page).then(response => {
        this.loading = false;
        this.issues = response.data;
        this.resetPagination(response.headers.link);
      });
    },
    resetPagination(link) {
      if (!link) {
        return;
      }

      this.first = 0;
      this.prev = 0;
      this.next = 0;
      this.last = 0;

      link.split(",").forEach(link => {
        let result = link.match(/<.*?&page=(\d+)>; rel="(\w+)"/is);
        if (result) {
          this[result[2]] = result[1];
        }
      });
    }
  },
  created() {
    this.fetchIssues(this.$route.query.page || 1);
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
.pagination
  margin 12px auto
  .page-item
    padding 6px 12px
    margin-left 24px
    background-color #3c4146
    color #fff
    display inline-block
    min-width 85px
    text-align center
    outline none
    text-decoration none
    position relative
    overflow hidden
    &:first-child
      margin-left 0
    &.disabled
      color #d1d5da
      background-color #fafbfc
      cursor no-drop
</style>
