<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      title=""
      autoBack
      fixed
      bgColor="#ffffff"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="flex p-14 justify-between back">
      <view class="flex items-center">
        <u-avatar :src="src" size="90"></u-avatar>
        <view class="pl-12">
          <view class="text"> test01 </view>
          <view class="con"> 账号：123abc </view>
        </view>
      </view>
    </view>
    <view class="px-10 back">
      <u-cell-group>
        <u-cell
          title="备注名"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/name', '备注名')"
        ></u-cell>
      </u-cell-group>
    </view>
    <view class="px-10 back ul">
      <u-cell-group>
        <u-cell title="生日"></u-cell>
        <u-cell title="手机"></u-cell>
        <u-cell title="邮箱"></u-cell>
        <u-cell title="个性签名"></u-cell>
      </u-cell-group>
    </view>
    <view class="px-10 back ul">
      <u-cell-group>
        <u-cell title="黑名单">
          <template #value>
            <u-switch
              v-model="value"
              activeColor="#59be68"
              size="50"
            ></u-switch>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
    <view class="row blue back"> 聊天 </view>
    <view class="row back" @click="delChange"> 删除 </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
      text: "test01",
      value: false,
    };
  },
  methods: {
    change(path, type) {
      uni.navigateTo({
        url: `${path}?type=${type}`,
      });
    },
    // 删除好友
    delChange() {},
  },
};
</script>

<style scoped lang="scss">
.page {
  .back {
    background-color: $white;
  }
  .text {
    font-size: 28rpx;
    padding-bottom: 10rpx;
  }
  .con {
    font-size: 24rpx;
  }
  .ul {
    border-top: 10rpx solid #eff0f3;
  }
  .row {
    border-top: 10rpx solid #eff0f3;
    color: red;
    text-align: center;
    padding: 20rpx 0;
    &.blue {
      color: #007aff;
    }
  }
  .copy {
    width: 30rpx;
    margin-left: 6rpx;
  }
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
}
</style>
