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

unifyPromiseVue2();

const app = new Vue({
  ...App,
});

Vue.mixin({
  onShow() {
    TabBarBadgeFn(uni.$unreadCount, 1);
    // 好友申请触发
    let onFriendApplicationListUpdated = function (event) {
      // unreadCount - 好友申请的未读数
      const { unreadCount } = event.data;
      TabBarBadgeFn(unreadCount, 1);
    };
    uni.$chat.on(
      uni.$tx.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
      onFriendApplicationListUpdated
    );

    let index = uni.$chat.getTotalUnreadMessageCount();
    // 获取消息总数
    TabBarBadgeFn(index);

    // 监听消息总数
    let onTotalUnreadMessageCountUpdated = (event) => {
      TabBarBadgeFn(event.data);
    };
    uni.$chat.on(
      uni.$tx.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED,
      onTotalUnreadMessageCountUpdated
    );
  },
});

function TabBarBadgeFn(text, index = 0) {
  if (text) {
    uni.setTabBarBadge({
      index,
      text: text + "",
    });
  } else {
    uni.removeTabBarBadge({
      index,
      fail: (err) => {},
    });
  }
}
// #endif

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifdef APP-PLUS
app.$mount();
// #endif
