import App from "./App";
import { router, RouterMount } from "./plugins/router";
import uView from "@/uni_modules/uview-ui";
// vue2 工程
// #ifndef VUE3
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import unifyPromiseVue2 from "./TUIKit/utils/unifyPromiseVue2";
Vue.config.productionTip = false;
Vue.use(router);
Vue.use(uView);

uni.$u.config.unit = "rpx";
import * as base from "plugins/base.js";
import * as api from "plugins/api.js";

Vue.prototype.$api = api;
Vue.prototype.$base = base;

App.mpType = "app";
Vue.use(VueCompositionAPI);

Vue.prototype.$onLaunched = new Promise((resolve) => {
  Vue.prototype.$isResolve = resolve;
});

unifyPromiseVue2();

const app = new Vue({
  ...App,
});
// #endif

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifdef APP-PLUS
app.$mount();
// #endif
