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
            :placeholder="`请输入${content}`"
            clearable
            border="none"
            :maxlength="25"
            v-model="name"
          ></u-input>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import TUIChatEngine, { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      loading: false,
      content: "",
      name: "",
      items: {},
      uid: "", // 好友id
    };
  },
  onLoad(e) {
    this.content = e.type;
    this.uid = e.id;
    // 获取信息
    if (e.type === "备注名") {
      uni.$chat
        .getFriendProfile({
          userIDList: [e.id],
        })
        .then(({ data }) => {
          this.name = data.friendList[0].remark;
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    } else {
      TUIUserService.getUserProfile()
        .then(({ data }) => {
          this.items = data;
          if (e.type === "昵称") {
            this.name = data.nick;
          } else if (e.type === "个性签名") {
            this.name = data.selfSignature;
          }
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    }
  },
  methods: {
    change() {
      let obj_data = {
        nick: this.items.nick,
        avatar: this.items.avatar,
        gender: this.items.gender,
        selfSignature: this.items.selfSignature,
        allowType: this.items.allowType,
      };
      if (this.content === "昵称") {
        obj_data.nick = this.name;
      } else if (this.content === "个性签名") {
        obj_data.selfSignature = this.name;
      } else if (this.content === "备注名") {
        uni.$chat
          .updateFriend({
            userID: this.uid,
            remark: this.name,
          })
          .then((data) => {
            this.$base.show("修改成功！");
          });
      }
      this.formFn(obj_data);
    },
    formFn(form) {
      uni.$chat.updateMyProfile(form).then(({ data }) => {
        this.$base.show("修改成功！");
      });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.uni-input-input {
  padding: 28rpx 0 !important;
  font-size: 32rpx;
}
/deep/.u-input__content__field-wrapper__field {
  height: auto;
}
.from {
  padding: 0 20rpx;
  box-sizing: border-box;
  background-color: #fff;
}
.config {
  color: #59be68;
}
</style>
