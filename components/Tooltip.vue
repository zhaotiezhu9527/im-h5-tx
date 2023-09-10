<template>
  <view class="tooltip">
    <view @click.native.stop="show = true">
      <slot></slot>
    </view>
    <u-transition :show="show" mode="fade">
      <view class="mask" @click.native.stop="show = true">
        <view class="flex py-6" @click="change('you')">
          <u-icon size="40" name="man-add" color="#ffffff"></u-icon>
          <text class="pl-4">添加好友</text>
        </view>
        <view class="flex py-6 u-border-top" @click="change('scan')">
          <u-icon size="40" name="scan" color="#ffffff"></u-icon>
          <view class="pl-4">扫一扫</view>
        </view>
      </view>
    </u-transition>
  </view>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showFn() {
      this.show = false;
    },
    change(type) {
      if (type === "scan") {
        uni.scanCode({
          success: (res) => {
            console.log(res);
            this.msg = res.result;
          },
        });
      } else {
        uni.navigateTo({
          url: "/pages/add",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  position: relative;
  .mask {
    position: absolute;
    top: 60rpx;
    right: -10rpx;
    z-index: 10;
    width: 220rpx;
    padding: 10rpx 20rpx;
    border-radius: 8rpx;
    background: #4d4b4d;
    view {
      color: $white;
      font-size: 24rpx;
    }
    &:before {
      content: "";
      position: absolute;
      right: 25rpx;
      top: -15rpx;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 15rpx solid #4e4d4e;
    }
  }
}
/deep/.u-border-top {
  border-color: #4e4d4e !important;
}
</style>
