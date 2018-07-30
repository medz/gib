<template>
    <div class="container loaded-header-fixed post-container">
      <Loading v-show="loading" />
      <div class="post-body" v-show="!loading">
        <h3 class="title">{{ issue.title }}</h3>
        <div class="markdown-body" v-html="issue.body_html" />
      </div>
      <div class="post-sidebar" v-show="!loading">2</div>
    </div>
</template>

<script>
import "github-markdown-css";
import { issue } from "../api/github-v3";
import Loading from "../components/Loading";
export default {
  components: { Loading },
  data: () => ({
    loading: true,
    issue: {}
  }),
  mounted() {
    let number = atob(this.$route.params.number).match(/^issue@number:(\d+)/i);

    this.loading = true;
    issue(number[1]).then(response => {
      this.issue = response.data;
      this.loading = false;

      document.title = this.issue.title + " - " + process.env.VUE_APP_NAME;
    });
  }
};
</script>

<style lang="stylus">
.post-container
  display flex
  justify-content flex-start
  flex 1
  flex-direction row
  align-items flex-start

  .post-body
    width 100%
    flex-shrink 1
    background-color #fff
    position relative
    padding 24px

    .title
      margin-bottom 24px

  .post-sidebar
    width 290px
    flex-shrink 0
    margin-left 24px
    background-color #fff
    position relative
    padding 24px
</style>
