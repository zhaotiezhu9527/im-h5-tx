<template>
  <view>
    <u-navbar
      placeholder
      :border="false"
      title=""
      fixed
      bgColor="#f5f4f6"
      leftIconSize="0"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="page">
      <view class="search">
        <u-search
          bgColor="#ffffff"
          clearabled
          focus
          v-model="keyword"
          shape="square"
          searchIconSize="50"
          placeholder="搜索"
          actionText="取消"
          height="70rpx"
          @search="search"
          @custom="clear"
        ></u-search>
      </view>
      <view class="main" v-if="list.length">
        <view class="title u-border-bottom">好友</view>
        <u-cell-group>
          <u-cell v-for="(item, index) in list">
            <template #title>
              <view
                class="flex items-center item"
                @click="itemChange(item)"
                :key="index"
              >
                <view class="icon">
                  <u--image
                    width="90rpx"
                    height="90rpx"
                    radius="8rpx"
                    :showLoading="true"
                    :src="item.profile.avatar"
                  ></u--image>
                </view>
                <view
                  class="span"
                  v-html="titleFn(item.remark || item.profile.nick)"
                >
                </view>
              </view>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
      <u-empty class="pt-40" v-else mode="data"> </u-empty>
    </view>
  </view>
</template>
<script>
import { TUIFriendService } from "@tencentcloud/chat-uikit-engine";

export default {
  data() {
    return {
      keyword: "",
      list: [], // 筛选后的数据
      listAll: [], // 好友集合
    };
  },
  onShow() {
    // 获取好友列表
    TUIFriendService.getFriendList()
      .then((res) => {
        this.listAll = res.data;
      })
      .catch((err) => {
        console.warn("getFriendList error:", err);
      });
  },
  methods: {
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/info?id=${item.userID}`,
      });
    },
    titleFn(e) {
      let title = e.replace(
        this.keyword,
        `<text class='green-c'>${this.keyword}</text>`
      );
      return title;
    },
    search(e) {
      let all = JSON.parse(JSON.stringify(this.listAll));
      this.list = all.filter(
        (item) => item.profile.nick.includes(e) || item.remark.includes(e)
      );
    },
    clear() {
      this.list = [];
      this.listAll = [];
      this.keyword = "";
      uni.navigateBack({
        delta: 1,
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
.title {
  font-size: 28rpx;
  padding: 10rpx 0;
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
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .span {
    font-size: 32rpx;
    padding-left: 14rpx;
  }
}
</style>
