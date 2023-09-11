<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      title="添加好友"
      fixed
      autoBack
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="search">
        <u-search
          bgColor="#ffffff"
          :showAction="false"
          clearabled
          v-model="keyword"
          shape="square"
          searchIconSize="40"
          placeholder="请输入账号"
          height="60rpx"
          @custom="clear"
          @search="search"
        ></u-search>
      </view>
      <view class="user">
        <text @click="show = true">我的账号：{{ items.nick }}</text>
        <view @click="show = true" class="img">
          <uqrcode
            ref="uqrcode2"
            canvas-id="qrcode2"
            :value="path"
            size="25"
          ></uqrcode
        ></view>
      </view>
      <view class="main" v-if="list.length">
        <u-cell-group>
          <u-cell v-for="(item, index) in list" :key="index">
            <template #title>
              <view class="flex items-center item" @click="itemChange(item)">
                <view class="icon">
                  <u--image
                    width="70rpx"
                    height="70rpx"
                    radius="50%"
                    :showLoading="true"
                    :src="item.avatar"
                  ></u--image>
                </view>
                <text class="span">{{ item.nick }}</text>
              </view>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
      <u-empty class="pt-40" mode="data" v-else> </u-empty>
    </view>
    <u-transition :show="show">
      <view class="maskCon" @click="show = false">
        <view class="mask">
          <view class="flex items-center">
            <u-avatar :src="items.avatar" size="90"></u-avatar>
            <view class="pl-12">
              <view class="text"> {{ items.nick }} </view>
            </view>
          </view>
          <view class="ewm">
            <uqrcode
              ref="uqrcode"
              canvas-id="qrcode"
              :value="path"
              size="125"
            ></uqrcode>
          </view>
          <view class="text">扫一扫上面的二维码图案添加为好友</view>
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
      keyword: "",
      list: [],
      path: "",
      items: {},
      show: false,
    };
  },
  onShow() {
    // 获取信息
    TUIUserService.getUserProfile()
      .then(({ data }) => {
        this.items = data;
        this.path = `/pages/info?id=${this.items.userID}`;
      })
      .catch(function (imError) {
        console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
      });
  },
  methods: {
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/info?id=${item.userID}`,
      });
    },
    search(e) {
      if (e === this.items.userID) {
        this.$base.show("不可查询自己！");
        return false;
      }
      // 获取其他用户信息
      TUIUserService.getUserProfile({
        userIDList: [e],
      })
        .then(({ data }) => {
          this.list = data;
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
    clear() {
      this.list = [];
      this.keyword = "";
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: $text-c-2;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-left: 10rpx;
    width: 50rpx;
    height: 50rpx;
  }
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.search {
  padding: 0 10rpx;
}
.main {
  background-color: $white;
  padding: 0 20rpx;
  margin-top: 20rpx;
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
  .u-cell__body {
    padding: 20rpx 0;
  }
}
.item {
  .icon {
    width: 70rpx;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &.yellow {
      background-color: #ed9f50;
    }
    &.block {
      background-color: #000;
    }
  }
  .span {
    padding-left: 10rpx;
  }
}
.maskCon {
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.mask {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: $white;
  transform: translate(-50%, -50%);
  width: 80%;
  border-radius: 10rpx;
  padding: 30rpx;
  .ewm {
    margin: 40rpx auto;
    width: 250rpx;
    height: 250rpx;
    border: 1rpx solid $line-c-0;
  }
  .text {
    font-size: 20rpx;
    text-align: center;
    color: $text-c-3;
  }
}
</style>
