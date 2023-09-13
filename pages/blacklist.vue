<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="黑名单"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="main">
      <view class="title">你不会收到列表中任何联系人的消息</view>
      <u-cell-group>
        <u-cell v-for="(item, index) in list" :key="index">
          <template #title>
            <view class="flex items-center item" @click="itemChange(item)">
              <view class="icon">
                <u--image
                  width="90rpx"
                  height="90rpx"
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
    <u-empty class="pt-40" mode="data" v-if="!list.length"> </u-empty>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  onShow() {
    // 黑名单列表
    uni.$chat.getBlacklist().then(({ data }) => {
      if (data.length) {
        uni.$chat
          .getUserProfile({
            userIDList: data,
          })
          .then((imResponse) => {
            this.list = imResponse.data;
          });
      }
    });
  },
  methods: {
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/info?id=${item.userID}&type=black`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 28rpx;
  line-height: 48rpx;
  background-color: #fff;
}
.page {
  height: 100%;
  background-color: $white;
}
.main {
  padding: 0 20rpx;
  .title {
    font-size: 28rpx;
    padding: 10rpx 0;
    color: $text-c-2;
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
  .u-cell__body {
    padding: 20rpx 0;
  }
}
.item {
  .icon {
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6rpx;
    &.yellow {
      background-color: #ed9f50;
    }
    &.block {
      background-color: #000;
    }
  }
  .span {
    font-size: 32rpx;
    padding-left: 14rpx;
  }
}
</style>
