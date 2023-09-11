<template>
  <view class="pages" @click="$refs.tooltipRef.showFn()">
    <u-navbar
      placeholder
      :border="false"
      title="通讯录"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="0"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
      <template #right>
        <Tooltip ref="tooltipRef">
          <u-icon size="45" name="man-add"></u-icon>
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
      <view class="main">
        <u-cell-group>
          <u-cell>
            <template #title>
              <view
                class="flex items-center item"
                @click="routePath('/pages/verify')"
              >
                <view class="icon yellow">
                  <u-icon
                    size="45"
                    color="#ffffff"
                    name="plus-people-fill"
                  ></u-icon>
                </view>
                <text class="span">验证信息</text>
              </view>
            </template>
          </u-cell>
          <u-cell>
            <template #title>
              <view
                class="flex items-center item"
                @click="routePath('/pages/blacklist')"
              >
                <view class="icon block">
                  <u-icon
                    size="45"
                    color="#ffffff"
                    name="minus-circle-fill"
                  ></u-icon>
                </view>
                <text class="span">黑名单</text>
              </view>
            </template>
          </u-cell>
          <u-cell v-for="(item, index) in list">
            <template #title>
              <view
                class="flex items-center item"
                @click="itemChange(item)"
                :key="index"
              >
                <view class="icon">
                  <u--image
                    width="70rpx"
                    height="70rpx"
                    radius="50%"
                    :showLoading="true"
                    :src="item.profile.avatar"
                  ></u--image>
                </view>
                <text class="span">{{ item.profile.nick }}</text>
              </view>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>
<script>
import Tooltip from "@/components/Tooltip.vue";
import TUIChatEngine, {
  TUIGlobal,
  TUITranslateService,
  TUIStore,
  StoreName,
  TUIFriendService,
  TUIGroupService,
  TUIConversationService,
  IGroupModel,
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
    // 获取好友列表
    TUIFriendService.getFriendList()
      .then((res) => {
        this.list = res.data;
      })
      .catch((err) => {
        console.warn("getFriendList error:", err);
      });
  },
  onTabItemTap() {
    this.$refs.tooltipRef.showFn();
  },
  methods: {
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/info?id=${item.userID}`,
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
}
</style>
