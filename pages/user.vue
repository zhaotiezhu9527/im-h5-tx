<template>
  <view class="page">
    <view class="flex p-14 justify-between">
      <view class="flex items-center">
        <u-avatar :src="src" size="90"></u-avatar>
        <view class="pl-12">
          <view class="text"> test01 </view>
          <view class="con"> 账号：123abc </view>
        </view>
      </view>
    </view>
    <view class="px-10">
      <u-cell-group>
        <u-cell
          title="头像"
          @click="change('/pages/avatar')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="昵称"
          value="test01"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/name', '昵称')"
        ></u-cell>
        <u-cell title="账号">
          <template #value>
            <text style="color: #606266">test01</text>
            <image src="@/static/copy.png" class="copy" mode="widthFix" />
          </template>
        </u-cell>
        <u-cell
          title="我的二维码"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/ewm')"
        ></u-cell>
        <u-cell
          title="性别"
          value="未知"
          @click="change('/pages/sex')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="生日"
          @click="show = true"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="手机"
          @click="change('/pages/name', '手机')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="邮箱"
          @click="change('/pages/name', '邮箱')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="修改密码"
          @click="change('/pages/pwd')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <u-cell
          title="个性签名"
          @click="change('/pages/name', '个性签名')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
      </u-cell-group>
    </view>
    <view class="row"> 退出登录 </view>
    <u-datetime-picker
      :show="show"
      v-model="value"
      :minDate="-662716800000"
      itemHeight="100"
      @cancel="show = false"
      @confirm="confirm"
      title="请选择时间"
      mode="date"
    ></u-datetime-picker>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
      text: "test01",
      show: false,
      value: new Date().getTime(),
    };
  },
  methods: {
    change(path, type) {
      uni.navigateTo({
        url: `${path}?type=${type}`,
      });
    },
    confirm(e) {
      console.log(uni.$u.timeFormat(e.value, "yyyy-mm-dd"));
      this.show = false;
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  padding-top: var(--status-bar-height);
  background: $white;
  .text {
    font-size: 28rpx;
    padding-bottom: 10rpx;
  }
  .con {
    font-size: 24rpx;
  }
  .row {
    border-top: 10rpx solid #eff0f3;
    color: red;
    text-align: center;
    padding: 20rpx 0;
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
