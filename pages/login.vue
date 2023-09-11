<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="登录"
      fixed
      bgColor="#ffffff"
      leftIconSize="0"
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
            placeholder="请输入账号"
            clearable
            border="none"
            v-model="userPhone"
          ></u-input>
          <view class="u-border-bottom"></view>
          <u-input
            placeholder="请输入密码"
            clearable
            password
            border="none"
            v-model="password"
          ></u-input>
        </view>
        <view class="btns">
          <u-button
            class="custom-style"
            color="#007aff"
            block
            @click="login"
            :loading="loading"
          >
            登录
          </u-button>
          <u-button
            class="custom-style"
            color="#ffffff"
            block
            @click="register"
            style="color: #a7a6a7"
          >
            去注册
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
      password: "",
      userPhone: "",
      loading: false,
    };
  },
  methods: {
    register() {
      uni.navigateTo({
        url: "/pages/register",
      });
    },
    login() {
      if (!this.userPhone) {
        return this.$base.show("请输入账号");
      } else if (!this.password) {
        return this.$base.show("请输入密码");
      }
      const DATA_OBJ = {
        loginPwd: this.password,
        userName: this.userPhone,
      };
      this.loading = true;
      this.$api
        .user_login(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            uni.setStorage({
              key: "token",
              data: res.data.token,
              success: () => {
                uni.setStorageSync("userID", this.userPhone);
                uni.setStorageSync("userSig", res.data.usersig);
                this.$base.configFn({
                  userID: this.userPhone,
                  userSig: res.data.usersig,
                });
                // #ifdef H5
                uni.switchTab({ url: "/" });
                // #endif
                // #ifdef APP-PLUS
                uni.switchTab({
                  url: "/pages/message",
                });
                // #endif
              },
            });
          }
        })
        .finally(() => {
          this.loading = false;
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
