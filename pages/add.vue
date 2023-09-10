<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      title="添加好友"
      fixed
      autoBack
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="search">
        <u-search
          bgColor="#ffffff"
          :showAction="false"
          clearabled
          v-model="keyword"
          shape="square"
          searchIconSize="40"
          placeholder="请输入账号"
          height="60rpx"
          @custom="clear"
        ></u-search>
      </view>
      <view class="user">
        <text @click="show = true">我的账号：ab231</text>
        <view @click="show = true" class="img"></view>
      </view>
      <view class="main">
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
    <u-transition :show="show">
      <view class="maskCon" @click="show = false">
        <view class="mask">
          <view class="flex items-center">
            <u-avatar :src="src" size="90"></u-avatar>
            <view class="pl-12">
              <view class="text"> test01 </view>
            </view>
          </view>
          <view class="ewm"></view>
          <view class="text">扫一扫上面的二维码图案添加为好友</view>
        </view>
      </view>
    </u-transition>
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
      show: false,
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
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
.user {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: $text-c-2;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-left: 10rpx;
    border: 1rpx solid #e1e1e1;
    width: 60rpx;
    height: 60rpx;
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
.maskCon {
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: $white;
  transform: translate(-50%, -50%);
  width: 80%;
  border-radius: 10rpx;
  padding: 30rpx;
  .ewm {
    margin: 40rpx auto;
    width: 250rpx;
    height: 250rpx;
    border: 1rpx solid $line-c-0;
  }
  .text {
    font-size: 20rpx;
    text-align: center;
    color: $text-c-3;
  }
}
</style>
