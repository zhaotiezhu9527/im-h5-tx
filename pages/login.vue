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
      border
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-weight:600;font-size:32rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="wrap">
        <view class="logo">
          <!-- <image class="img" mode="widthFix" src="../static/img/login_logo.png" /> -->
        </view>
        <view class="from">
          <u-form ref="uForm" labelPosition="left" labelWidth="180">
            <u-form-item label="账号">
              <u-input
                type="text"
                placeholder="请输入账号"
                clearable
                border="none"
                v-model="userPhone"
              ></u-input>
            </u-form-item>
            <u-form-item label="密码">
              <u-input
                placeholder="请输入密码"
                clearable
                border="none"
                v-show="passicon1"
                v-model="password"
              >
                <view slot="suffix" @click="pwdChange">
                  <u-icon name="eye" color="#000" size="46rpx"></u-icon>
                </view>
              </u-input>
              <u-input
                type="password"
                placeholder="请输入密码"
                clearable
                v-show="!passicon1"
                border="none"
                v-model="password"
              >
                <view slot="suffix" @click="pwdChange">
                  <u-icon name="eye-off" color="#000" size="46rpx"></u-icon>
                </view>
              </u-input>
            </u-form-item>
          </u-form>
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
            <view class="register" @click="register"> 注册 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      passicon1: false,
      password: "",
      userPhone: "",
      loading: false,
    };
  },
  methods: {
    pwdChange() {
      this.passicon1 = !this.passicon1;
    },
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
  },
};
</script>

<style scoped lang="scss">
view,
text {
  font-size: 32rpx;
}
.logo {
  display: flex;
  justify-content: center;
  padding-top: 60rpx;
  .img {
    width: 50%;
  }
}
.btns {
  text-align: center;
  padding: 40rpx 0;
  .custom-style {
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    font-size: 32rpx;
    height: 88rpx;
  }
  .register {
    color: #007aff;
    font-size: 32rpx;
    margin-top: 40rpx;
  }
}
.from {
  padding: 40rpx;
  width: 100%;
  box-sizing: border-box;
  .image {
    height: 60rpx;
  }
}
</style>
