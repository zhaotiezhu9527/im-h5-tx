<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      autoBack
      title="验证信息"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
      rightText="清空"
      @rightClick="change"
    >
      <template #right>
        <view class="clear">清空</view>
      </template>
    </u-navbar>
    <view class="main">
      <u-cell-group>
        <u-cell v-for="(item, index) in list" :key="index">
          <template #title>
            <view class="flex items-center item" @click="itemChange(item)">
              <view class="icon">
                <u-image
                  width="90rpx"
                  height="90rpx"
                  radius="50%"
                  :showLoading="true"
                  :src="item.avatar"
                ></u-image>
              </view>
              <text class="span">{{ item.nick }}</text>
            </view>
          </template>
          <template #value>
            <view class="text-c-2">
              {{ $u.timeFrom(item.time, "yyyy-mm-dd") }}
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
    // 获取好友申请列表
    this.dataFn();
    let _that = this;
    // 好友申请触发
    let onFriendApplicationListUpdated = function (event) {
      const { friendApplicationList } = event.data;
      _that.list = friendApplicationList;
    };

    uni.$chat.on(
      uni.$tx.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
      onFriendApplicationListUpdated
    );
  },
  methods: {
    dataFn() {
      uni.$chat.getFriendApplicationList().then(({ data }) => {
        this.list = data.friendApplicationList;
        console.log(this.list);
      });
    },
    // 清空
    change() {
      let len = 0;
      if (!this.list.length) return false;
      this.list.forEach((item, index) => {
        uni.$chat
          .deleteFriendApplication({
            userID: item.userID,
            type: item.type,
          })
          .then(() => {
            len++;
            if (len === index) {
              this.dataFn();
            }
          });
      });
    },
    // 申请验证详情
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/detail?id=${item.userID}`,
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
  .clear {
    color: $text-c-2;
  }
}
.main {
  padding: 0 20rpx;
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
    padding-left: 14rpx;
    font-size: 32rpx;
  }
}
.btn {
  width: 100rpx;
  min-width: 100rpx;
  height: 50rpx;
}
</style>
