<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="关于我们"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="main">
      <view class="helps">
        <rich-text :nodes="config.about" space="nbsp" image-menu-prevent />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      config: {},
    };
  },
  onShow() {
    this.$api.system_config().then(({ data }) => {
      this.config = data.data;
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.main {
  background-color: #ffffff;
  overflow-y: auto;
  width: 100%;
  height: calc(
    100vh - 100rpx - var(--status-bar-height) - constant(safe-area-inset-bottom)
  );
  height: calc(
    100vh - 100rpx - var(--status-bar-height) - env(safe-area-inset-bottom)
  );
  .helps {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 20rpx;
  }
}
</style>
