<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="性别"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="wrap">
        <view class="flex justify-between u-border-bottom">
          <text>男</text>
          <u-icon name="checkbox-mark" color="#59be68"></u-icon>
        </view>
        <view class="flex justify-between">
          <text>女</text>
          <!-- <u-icon name="checkbox-mark" color="#59be68"></u-icon> -->
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      userPhone: "",
      loading: false,
      content: "",
    };
  },
  onLoad(e) {
    this.content = e.type;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
/deep/.uni-input-input {
  padding: 18rpx 0 !important;
  font-size: 28rpx;
}
/deep/.u-input__content__field-wrapper__field {
  height: auto;
}
.wrap {
  background-color: #fff;
  padding: 0 20rpx;
  .flex {
    padding: 20rpx 10rpx;
    box-sizing: border-box;
  }
}
</style>
