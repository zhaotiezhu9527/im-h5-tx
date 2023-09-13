<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="验证信息"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
      rightText="清空"
      @rightClick="change"
    >
      <template #right>
        <view class="clear">清空</view>
      </template>
    </u-navbar>
    <view class="main">
      <u-cell-group>
        <u-cell>
          <template #title>
            <view class="flex items-center item" @click="itemChange">
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
          <template #value>
            <u-button class="btn" color="#59be68" size="small"> 通过 </u-button>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onShow() {},
  methods: {
    change() {},
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
.page {
  height: 100%;
  background-color: $white;
  .clear {
    color: $text-c-2;
  }
}
.main {
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
.btn {
  width: 100rpx;
  min-width: 100rpx;
  height: 50rpx;
}
</style>
