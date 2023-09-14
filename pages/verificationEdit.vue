<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="验证方式"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
      rightText="完成"
      @rightClick="change"
    >
      <template #right>
        <view @click="change" class="config">完成</view>
      </template>
    </u-navbar>
    <view class="page">
      <view class="wrap">
        <view
          class="flex justify-between"
          :class="{ 'u-border-bottom': index !== list.length - 1 }"
          v-for="(item, index) in list"
          @click="content = item.text"
          :key="index"
        >
          <text>{{ item.name }}</text>
          <u-icon
            name="checkbox-mark"
            v-if="item.text === content"
            color="#59be68"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import TencentCloudChat from "@tencentcloud/chat";
import { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      userPhone: "",
      loading: false,
      content: undefined,
      items: {},
      list: [
        {
          name: "允许直接加为好友",
          text: TencentCloudChat.TYPES.ALLOW_TYPE_ALLOW_ANY,
        },
        {
          name: "需要验证",
          text: TencentCloudChat.TYPES.ALLOW_TYPE_NEED_CONFIRM,
        },
        {
          name: "拒绝",
          text: TencentCloudChat.TYPES.ALLOW_TYPE_DENY_ANY,
        },
      ],
    };
  },
  onLoad(e) {
    // 获取信息
    TUIUserService.getUserProfile()
      .then(({ data }) => {
        this.items = data;
        this.content = data.allowType;
      })
      .catch(function (imError) {
        console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
      });
  },
  methods: {
    change() {
      if (!this.content) {
        this.$base.show("请选择验证方式");
        return false;
      }
      uni.$chat
        .updateMyProfile({
          selfSignature: this.items.selfSignature,
        })
        .then(({ data }) => {
          this.$base.show("修改成功！");
        });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.u-input__content__field-wrapper__field {
  height: auto;
}
.wrap {
  background-color: #fff;
  padding: 0 20rpx;
  font-size: 28rpx;
  .flex {
    font-size: 28rpx;
    padding: 30rpx 10rpx;
    box-sizing: border-box;
  }
}
.config {
  color: #59be68;
}
</style>
