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
            type="text"
            placeholder="请输入原密码"
            clearable
            password
            border="none"
            v-model="userPhone"
          ></u-input>
          <view class="u-border-bottom"></view>
          <u-input
            placeholder="请输入新密码"
            clearable
            password
            border="none"
            v-model="password"
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
      password: "",
      newPassword: "",
      userPhone: "",
      loading: false,
    };
  },
  methods: {
    submit() {
      if (!this.userPhone) {
        return this.$base.show("请输入账号");
      } else if (!this.password) {
        return this.$base.show("请输入密码");
      } else if (this.password !== this.newPassword) {
        return this.$base.show("密码不一致");
      }
      const DATA_OBJ = {
        loginPwd: this.password,
        userName: this.userPhone,
      };
      this.loading = true;
      this.$api
        .user_register(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            uni.setStorage({
              key: "token",
              data: res.data.token,
              success: function () {
                // uni.setStorageSync('userID','')
                // uni.setStorageSync('SDKAppID','')
                // uni.setStorageSync('secretKey','')
                this.$base.configFn();
                uni.switchTab({ url: "/" });
              },
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
