<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="添加好友"
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
        <view class="config" @click="change">完成</view>
      </template>
    </u-navbar>
    <view class="page">
      <view class="wrap">
        <view class="from">
          <u-input
            type="text"
            placeholder="请输入备注名"
            clearable
            border="none"
            :maxlength="5"
            v-model="remark"
          ></u-input>
        </view>
        <view class="from">
          <u-textarea
            placeholder="`请输入留言"
            clearable
            height="200"
            border="none"
            :maxlength="25"
            v-model="wording"
          ></u-textarea>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import TencentCloudChat from "@tencentcloud/chat";
import TUIChatEngine, { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      remark: "",
      wording: "",
      uid: "",
    };
  },
  onLoad(e) {
    this.uid = e.id;
    TUIUserService.getUserProfile()
      .then(({ data }) => {
        this.wording = "我是 " + data.nick;
      })
      .catch(function (imError) {
        console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
      });
  },
  methods: {
    change() {
      uni.$chat
        .addFriend({
          to: this.uid,
          source: "AddSource_Type_Web",
          remark: this.remark,
          groupName: "好友",
          wording: this.wording,
          type: TencentCloudChat.TYPES.SNS_ADD_TYPE_BOTH,
        })
        .then((imResponse) => {
          // 添加好友的请求发送成功
          const { code } = imResponse.data;
          if (code === 30539) {
            this.$base.show("提交成功，等待对方验证！");
          } else if (code === 0) {
            this.$base.show("添加好友成功！");
            uni.navigateBack({
              delta: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // this.$base.show("对方在自己的黑名单中，不允许加好友");
        });
    },
  },
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
/deep/.u-textarea {
  padding: 18rpx 0 !important;
}
.from {
  padding: 0 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 10rpx;
}
.config {
  color: #59be68;
}
</style>
