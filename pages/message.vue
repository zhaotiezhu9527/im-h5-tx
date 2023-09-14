<template>
  <view class="pages">
    <u-navbar
      placeholder
      :border="false"
      fixed
      bgColor="#f5f4f6"
      safe-area-inset-top
      rightIcon="plus-circle"
      @rightClick="rightClick"
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
      leftText="消息"
    >
      <template #left>
        <view class="title">消息</view>
      </template>
      <template #right>
        <Tooltip ref="tooltipRef">
          <u-icon size="45" name="plus-circle"></u-icon>
        </Tooltip>
      </template>
    </u-navbar>
    <view class="page" @click="$refs.tooltipRef.showFn()">
      <view
        class="search flex justify-center items-center"
        @click="routePath('/pages/search')"
      >
        <u-icon name="search" size="40rpx" color="#8b92a0"></u-icon>
        <text>搜索</text>
      </view>
      <view class="main" v-if="list.length">
        <u-cell-group>
          <u-cell v-for="(item, index) in list" :key="index">
            <template #title>
              <u-swipe-action>
                <u-swipe-action-item
                  :options="options"
                  @click="change($event, item)"
                >
                  <view
                    class="flex items-start justify-between item"
                    @click="itemChange(item)"
                  >
                    <view class="flex items-center">
                      <view class="icon">
                        <u-badge
                          class="badge"
                          color="#ffffff"
                          max="99"
                          v-if="item.unreadCount"
                          :value="item.unreadCount"
                        ></u-badge>
                        <u-image
                          width="90rpx"
                          height="90rpx"
                          radius="50%"
                          :showLoading="true"
                          :src="item.userProfile.avatar"
                        ></u-image>
                      </view>
                      <view>
                        <text class="span">
                          {{ item.remark || item.userProfile.nick }}
                        </text>
                        <view class="txt">
                          {{ item.lastMessage.messageForShow }}
                        </view>
                      </view>
                    </view>
                    <view class="time">
                      {{ $u.timeFrom(item.lastMessage.lastTime, "yyyy-mm-dd") }}
                    </view>
                  </view>
                </u-swipe-action-item>
              </u-swipe-action>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
      <u-empty class="pt-40" mode="data" v-else> </u-empty>
    </view>
  </view>
</template>
<script>
import Tooltip from "@/components/Tooltip.vue";
import {
  TUIStore,
  StoreName,
  TUIConversationService,
} from "@tencentcloud/chat-uikit-engine";

export default {
  components: {
    Tooltip,
  },
  data() {
    return {
      options: [
        { text: "删除", style: { backgroundColor: "red", color: "#ffffff" } },
      ],
      list: [],
    };
  },
  onShow() {
    TUIStore.watch(StoreName.CONV, {
      conversationList: (data) => {
        this.list = data;
        console.log(data);
      },
    });
    setTimeout(() => {
      // 会话列表更新
      let _that = this;
      let onConversationListUpdated = function (event) {
        uni.$chat.getConversationList().then(({ data }) => {
          _that.list = data.conversationList;
        });
      };
      uni.$chat.on(
        uni.$tx.EVENT.CONVERSATION_LIST_UPDATED,
        onConversationListUpdated
      );
    }, 500);
  },
  onTabItemTap() {
    this.$refs.tooltipRef.showFn();
  },
  methods: {
    rightClick() {
      if (!this.$refs.tooltipRef.show) {
        this.$refs.tooltipRef.showFn(true);
      }
    },
    // 进入回话
    itemChange(item) {
      TUIConversationService.switchConversation(item.conversationID).catch(
        () => {
          this.$base.show("进入回话失败");
        }
      );
      uni.navigateTo({
        url: "/TUIKit/components/TUIChat/index",
      });
    },
    //搜索跳转
    routePath(url) {
      uni.navigateTo({
        url,
      });
    },
    // 删除会话
    change(e, item) {
      if (e.index === 0) {
        uni.$chat.deleteConversation(item.conversationID);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
}
.pages {
  height: 100%;
  .title {
    font-size: 32rpx;
    font-weight: 500;
  }
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.search {
  position: sticky;
  top: calc(100rpx + var(--status-bar-height));
  margin: 0 20rpx 20rpx;
  padding: 15rpx;
  background-color: $white;
  border-radius: 8rpx;
  color: $text-c-2;
}
.main {
  background-color: $white;
  padding: 0;
}
/deep/.u-cell-group__wrapper {
  > .u-line {
    border-bottom: 0 !important;
  }
  .u-cell:nth-last-child(1) .u-line {
    border-bottom: 0 !important;
  }
  .u-icon__icon--info {
    font-size: 28rpx !important;
  }
  .u-cell__body {
    padding: 0;
  }
}
.item {
  padding: 20rpx;
  .icon {
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .badge {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
    }
    &.yellow {
      background-color: #ed9f50;
    }
    &.block {
      background-color: #000;
    }
  }
  .span {
    font-size: 32rpx;
    padding-left: 14rpx;
  }
  .txt {
    padding-left: 14rpx;
    padding-top: 8rpx;
    font-size: 26rpx;
    color: $text-c-2;
  }
  .time {
    font-size: 24rpx;
    color: $text-c-2;
  }
}
</style>
