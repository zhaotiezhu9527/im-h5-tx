<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="修改密码"
      fixed
      bgColor="#ffffff"
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
            placeholder="请输入原密码"
            clearable
            password
            border="none"
            v-model="oldPwd"
          ></u-input>
          <view class="u-border-bottom"></view>
          <u-input
            placeholder="请输入新密码"
            clearable
            password
            border="none"
            v-model="newPwd"
          ></u-input>
          <view class="u-border-bottom"></view>
          <u-input
            placeholder="请输入确认密码"
            clearable
            password
            border="none"
            v-model="newPassword"
          ></u-input>
        </view>
        <view class="btns">
          <u-button
            class="custom-style"
            color="#007aff"
            block
            @click="submit"
            :loading="loading"
          >
            确认修改
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      oldPwd: "",
      newPassword: "",
      newPwd: "",
      loading: false,
    };
  },
  methods: {
    submit() {
      if (!this.oldPwd) {
        return this.$base.show("请输入原密码");
      } else if (!this.newPwd) {
        return this.$base.show("请输入新密码");
      } else if (this.newPwd !== this.newPassword) {
        return this.$base.show("密码不一致");
      }
      const DATA_OBJ = {
        newPwd: this.newPwd,
        oldPwd: this.oldPwd,
      };
      this.loading = true;
      this.$api
        .user_update_pwd(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            TUIChatEngine.logout()
              .then(() => {
                uni.removeStorage({
                  key: "token",
                  success: (res) => {
                    uni.removeStorageSync("userID");
                    uni.removeStorageSync("SDKAppID");
                    uni.removeStorageSync("secretKey");
                    uni.redirectTo({ url: "/pages/login" });
                    this.$base.show("修改成功，重新登录");
                  },
                });
              })
              .catch(function (imError) {
                console.warn("logout error:", imError);
              });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    register() {
      uni.navigateTo({
        url: "/pages/login",
      });
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.uni-input-input {
  padding: 28rpx 0 !important;
  font-size: 28rpx;
}
/deep/.u-input__content__field-wrapper__field {
  height: auto;
}
.btns {
  text-align: center;
  padding: 0 30rpx;
  .custom-style {
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    height: 70rpx;
  }
  .register {
    color: #007aff;
    font-size: 32rpx;
    margin-top: 40rpx;
  }
}
.from {
  margin: 40rpx 30rpx;
  width: calc(100% - 60rpx);
  border-radius: 10rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  .image {
    height: 60rpx;
  }
}
</style>
