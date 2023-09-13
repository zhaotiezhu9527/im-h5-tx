<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="我的二维码"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="mask">
        <view class="flex items-center">
          <u-avatar :src="items.avatar" size="90"></u-avatar>
          <view class="pl-12">
            <view class="text"> {{ items.nick }} </view>
          </view>
        </view>
        <view class="ewm">
          <uqrcode
            ref="uqrcode"
            canvas-id="qrcode"
            :value="path"
            size="125"
          ></uqrcode>
        </view>
        <view class="text">扫一扫上面的二维码图案添加为好友</view>
      </view>
    </view>
  </view>
</template>
<script>
import { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      items: {},
      path: "",
    };
  },
  async onLoad() {
    await this.$onLaunched;
    // 获取信息
    TUIUserService.getUserProfile()
      .then(({ data }) => {
        this.items = data;
        this.path = `/pages/info?id=${this.items.userID}`;
      })
      .catch(function (imError) {
        console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
      });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: $white;
  transform: translate(-50%, -50%);
  width: 90%;
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
