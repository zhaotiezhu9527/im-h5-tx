<template>
  <view class="page">
    <view class="flex p-14 justify-between">
      <view class="flex items-center">
        <u-avatar :src="items.avatar" size="90"></u-avatar>
        <view class="pl-12">
          <view class="text"> {{ items.nick }} </view>
          <view class="con"> 账号：{{ items.userID }} </view>
        </view>
      </view>
    </view>
    <view class="px-10">
      <u-cell-group>
        <!-- <u-cell
          title="头像"
          @click="change('/pages/avatar')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell> -->
        <u-cell
          title="昵称"
          :value="items.nick"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/name', '昵称')"
        ></u-cell>
        <u-cell title="账号" @click="copy">
          <template #value>
            <text style="color: #606266">{{ items.userID }}</text>
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
          :value="genderFn()"
          @click="change('/pages/sex')"
          :isLink="true"
          arrow-direction="left"
        ></u-cell>
        <!-- <u-cell
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
        ></u-cell> -->
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
          :value="items.selfSignature"
          arrow-direction="left"
        ></u-cell>
      </u-cell-group>
    </view>
    <view class="row" @click="logout"> 退出登录 </view>
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
import TUIChatEngine, { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      items: {},
      show: false,
      value: new Date().getTime(),
    };
  },
  onShow() {
    // 获取信息
    TUIUserService.getUserProfile()
      .then(({ data }) => {
        this.items = data;
        console.log(data);
      })
      .catch(function (imError) {
        console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
      });
  },
  methods: {
    genderFn() {
      let name = "";
      switch (this.items.gender) {
        case "Gender_Type_Male":
          name = "男";
          break;
        case "Gender_Type_Female":
          name = "女";
          break;
        default:
          name = "";
          break;
      }
      return name;
    },
    // 退出登录
    logout() {
      this.$api.user_logout().then(() => {
        TUIChatEngine.logout()
          .then(() => {
            uni.removeStorage({
              key: "token",
              success: (res) => {
                uni.removeStorageSync("userID");
                uni.removeStorageSync("SDKAppID");
                uni.removeStorageSync("secretKey");
                uni.redirectTo({ url: "/pages/login" });
                this.$base.show("退出登录成功！");
              },
            });
          })
          .catch(function (imError) {
            console.warn("logout error:", imError);
          });
      });
    },
    // 页面跳转
    change(path, type) {
      uni.navigateTo({
        url: `${path}?type=${type}?id=${this.items.userID}`,
      });
    },
    confirm(e) {
      console.log(uni.$u.timeFormat(e.value, "yyyy-mm-dd"));
      this.show = false;
    },
    // 复制
    copy() {
      uni.setClipboardData({
        data: this.items.userID,
        success: () => {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
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
