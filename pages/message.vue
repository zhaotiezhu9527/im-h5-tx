<template>
  <view class="pages" @click="$refs.tooltipRef.showFn()">
    <u-navbar
      placeholder
      :border="false"
      fixed
      bgColor="#f5f4f6"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
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
    <view class="page">
      <view
        class="search flex justify-center"
        @click="routePath('/pages/search')"
      >
        <u-icon name="search" size="40rpx" color="#8b92a0"></u-icon>
        <text>搜索</text>
      </view>
      <view class="main" v-if="list.length">
        <u-cell-group>
          <u-cell v-for="(item, index) in list" :key="index">
            <template #title>
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
                    <u--image
                      width="70rpx"
                      height="70rpx"
                      radius="50%"
                      :showLoading="true"
                      :src="item.getAvatar()"
                    ></u--image>
                  </view>
                  <view>
                    <text class="span">
                      {{ item.getShowName() }}
                    </text>
                    <view class="txt">
                      {{ item.getLastMessage("text") }}
                    </view>
                  </view>
                </view>
                <view class="time">
                  {{ item.getLastMessage("time") }}
                </view>
              </view>
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
      list: [],
    };
  },
  onShow() {
    TUIStore.watch(StoreName.CONV, {
      conversationList: (data) => {
        this.list = data;
      },
    });
  },
  onTabItemTap() {
    this.$refs.tooltipRef.showFn();
  },
  methods: {
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
    routePath(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style scoped lang="scss">
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
  padding: 0 20rpx;
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
    padding: 20rpx 0;
  }
}
.item {
  .icon {
    width: 70rpx;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6rpx;
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
    padding-left: 10rpx;
  }
  .txt {
    padding-left: 10rpx;
    font-size: 20rpx;
    color: $text-c-2;
  }
  .time {
    font-size: 18rpx;
    color: $text-c-2;
  }
}
</style>
