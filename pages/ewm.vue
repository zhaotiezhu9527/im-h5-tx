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
          <u-avatar :src="src" size="90"></u-avatar>
          <view class="pl-12">
            <view class="text"> test01 </view>
          </view>
        </view>
        <view class="ewm"></view>
        <view class="text">扫一扫上面的二维码图案添加为好友</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
      text: "test01",
    };
  },
  onLoad() {},
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
