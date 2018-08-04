import Vue from "vue";
// import Router from "vue";
import Layout from "@theme/layout";

Vue.config.productionTip = false;
// Vue.component('Layout', Layout);

export function createApp() {
  const app = new Vue({
    render: h => h(Layout)
  });
}
