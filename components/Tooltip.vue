<template>
  <view class="tooltip">
    <view @click="nativeChange">
      <slot></slot>
    </view>
    <u-transition :show="show" mode="fade">
      <view class="mask">
        <view class="flex items-center py-10" @click="change($event, 'you')">
          <u-icon size="40" name="man-add" color="#ffffff"></u-icon>
          <text class="pl-4">添加好友</text>
        </view>
        <view
          class="flex items-center py-10 u-border-top"
          @click="change($event, 'scan')"
        >
          <u-icon size="40" name="scan" color="#ffffff"></u-icon>
          <view class="pl-4">扫一扫</view>
        </view>
      </view>
    </u-transition>
  </view>
</template>
<script>
import { TUIUserService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    nativeChange(e) {
      e.stopPropagation();
      this.show = true;
    },
    showFn(bool = false) {
      this.show = bool;
    },
    change(e, type) {
      e.stopPropagation();
      if (type === "scan") {
        uni.scanCode({
          success: (res) => {
            // 判断是否是自己，是的话则跳转user,不是则跳转info
            if (!res.result.includes("/pages/info")) {
              this.$base.show("无效链接");
              return false;
            }
            let all = res.result.split("/");
            // 获取信息
            TUIUserService.getUserProfile()
              .then(({ data }) => {
                if (all[3] === data.userID) {
                  uni.switchTab({
                    url: "/pages/user",
                  });
                } else {
                  this.dataFn(all[3]);
                }
              })
              .catch(function (imError) {
                console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
              });
          },
          complete: () => {
            this.show = false;
          },
        });
      } else {
        uni.navigateTo({
          url: "/pages/add",
          complete: (res) => {
            this.show = false;
          },
        });
      }
    },
    dataFn(id) {
      uni.$chat
        .getUserProfile({
          userIDList: [id],
        })
        .then(({ data }) => {
          if (data.length) {
            uni.navigateTo({
              url: `/pages/info?id=${data[0].userID}`,
            });
          } else {
            this.$base.show("暂无此用户！");
          }
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  position: relative;
  .mask {
    position: absolute;
    top: 60rpx;
    right: -10rpx;
    z-index: 10;
    width: 220rpx;
    padding: 10rpx 20rpx;
    border-radius: 8rpx;
    background: #4d4b4d;
    view {
      color: $white;
      font-size: 28rpx;
    }
    &:before {
      content: "";
      position: absolute;
      right: 25rpx;
      top: -15rpx;
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 15rpx solid #4e4d4e;
    }
  }
}
/deep/.u-border-top {
  border-color: rgba(#fff, 0.1) !important;
}
</style>
