import Vue from "vue";
import Router from "vue-router";
import Posts from "./views/Posts.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/posts"
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts
    },
    {
      path: "/posts/:date/:number.html",
      name: "post",
      component: () => import(/* webpackChunkName: "post" */ "./views/Post.vue")
    }
  ]
});
