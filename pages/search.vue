<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      title=""
      fixed
      bgColor="#f5f4f6"
      leftIconSize="0"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="search">
        <u-search
          bgColor="#ffffff"
          clearabled
          focus
          v-model="keyword"
          shape="square"
          searchIconSize="40"
          placeholder="搜索"
          actionText="取消"
          height="60rpx"
          @custom="clear"
        ></u-search>
      </view>
      <view class="main">
        <view class="title u-border-bottom">好友</view>
        <u-cell-group>
          <u-cell>
            <template #title>
              <view class="flex items-center item">
                <view class="icon">
                  <u--image
                    width="70rpx"
                    height="70rpx"
                    radius="8rpx"
                    :showLoading="true"
                    src="https://cdn.uviewui.com/uview/album/8.jpg"
                  ></u--image>
                </view>
                <text class="span">在线客服1号</text>
              </view>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>
<script>
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
  data() {
    return {
      keyword: "",
    };
  },
  onShow() {},
  methods: {
    clear() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style scoped lang="scss">
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
.title {
  font-size: 10rpx;
  padding: 10rpx 0;
}
.search {
  padding: 0 10rpx;
}
.main {
  background-color: $white;
  padding: 0 20rpx;
  margin-top: 20rpx;
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
