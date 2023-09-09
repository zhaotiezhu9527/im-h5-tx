<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      :title="content"
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
        <view class="from">
          <u-input
            type="text"
            :placeholder="`请输入${content}`"
            clearable
            border="none"
            v-model="userPhone"
          ></u-input>
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
.from {
  padding: 0 20rpx;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
