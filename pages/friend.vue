<template>
  <view class="pages">
    <u-navbar
      placeholder
      :border="false"
      title="通讯录"
      fixed
      bgColor="#f5f4f6"
      leftIconSize="0"
      rightIcon="man-add"
      safe-area-inset-top
      height="100rpx"
      @rightClick="rightClick"
      titleStyle="color:#000;font-size:28rpx;"
    >
      <template #right>
        <Tooltip ref="tooltipRef">
          <u-icon size="45" name="man-add"></u-icon>
        </Tooltip>
      </template>
    </u-navbar>
    <view class="page" @click="$refs.tooltipRef.showFn()">
      <view
        class="search flex justify-center items-center"
        @click="routePath('/pages/search')"
      >
        <u-icon name="search" size="40rpx" color="#8b92a0"></u-icon>
        <text>搜索</text>
      </view>
      <view class="back">
        <u-index-list
          :index-list="indexList"
          activeColor="#59be68"
          :sticky="false"
        >
          <view class="main">
            <u-cell-group>
              <u-cell>
                <template #title>
                  <view
                    class="flex items-center item"
                    @click="routePath('/pages/verify')"
                  >
                    <view class="icon yellow">
                      <u-icon
                        size="45"
                        color="#ffffff"
                        name="plus-people-fill"
                      ></u-icon>
                    </view>
                    <text class="span">验证信息</text>
                  </view>
                </template>
                <template #value>
                  <view class="red" v-if="count">{{ count }}</view>
                </template>
              </u-cell>
              <u-cell>
                <template #title>
                  <view
                    class="flex items-center item"
                    @click="routePath('/pages/blacklist')"
                  >
                    <view class="icon block">
                      <u-icon
                        size="45"
                        color="#ffffff"
                        name="minus-circle-fill"
                      ></u-icon>
                    </view>
                    <text class="span">黑名单</text>
                  </view>
                </template>
              </u-cell>
            </u-cell-group>
          </view>
          <template v-for="(vim, index) in itemArr">
            <!-- #ifdef APP-NVUE -->
            <u-index-anchor
              :text="indexList[index]"
              bgColor="#edeced"
              color="#8c8b8d"
              size="28"
              height="40"
            ></u-index-anchor>
            <!-- #endif -->
            <u-index-item>
              <!-- #ifndef APP-NVUE -->
              <u-index-anchor
                :text="indexList[index]"
                bgColor="#edeced"
                color="#8c8b8d"
                height="40"
                size="28"
              ></u-index-anchor>
              <!-- #endif -->
              <view
                class="flex items-center item p-10"
                v-for="(item, index) in vim"
                @click="itemChange(item)"
              >
                <view class="icon">
                  <image
                    class="avatar"
                    mode="widthFix"
                    :src="item.profile.avatar"
                  ></image>
                </view>
                <text class="span">{{ item.remark || item.profile.nick }}</text>
              </view>
            </u-index-item>
          </template>
        </u-index-list>
      </view>
    </view>
  </view>
</template>
<script>
import Tooltip from "@/components/Tooltip.vue";
import { pinyin } from "pinyin-pro";
import { TUIFriendService } from "@tencentcloud/chat-uikit-engine";
export default {
  components: {
    Tooltip,
  },
  data() {
    return {
      indexList: [],
      itemArr: [],
      list: [],
      count: 0,
    };
  },
  onShow() {
    // 好友申请触发
    let _that = this;
    let onFriendApplicationListUpdated = function (event) {
      // unreadCount - 好友申请的未读数
      const { unreadCount } = event.data;
      _that.count = unreadCount;
      uni.$unreadCount = unreadCount;
    };
    uni.$chat.on(
      uni.$tx.EVENT.FRIEND_APPLICATION_LIST_UPDATED,
      onFriendApplicationListUpdated
    );
    this.dataFn();
    // 好友列表触发
    let onFriendListUpdated = (event) => {
      this.dataFn();
    };
    uni.$chat.on(uni.$tx.EVENT.FRIEND_LIST_UPDATED, onFriendListUpdated);
  },
  onTabItemTap() {
    if (this.$refs.tooltipRef) {
      this.$refs.tooltipRef.showFn();
    }
  },
  methods: {
    dataFn() {
      this.indexList = [];
      this.itemArr = [];
      this.list = [];
      // 获取好友列表
      TUIFriendService.getFriendList()
        .then((res) => {
          if (!res.data.length) return false;
          this.list = res.data.map((e) => {
            return {
              ...e,
              en: pinyin(e.remark || e.profile.nick).slice(0, 1),
              cn: pinyin(e.remark || e.profile.nick),
            };
          });
          this.list = this.list.sort((a, b) => {
            return a.cn.localeCompare(b.cn);
          });
          this.indexList = this.list.map((e) => e.en);
          this.indexList = [...new Set(this.indexList)];
          this.list.forEach((item) => {
            let index = this.indexList.findIndex((e) => e === item.en);
            if (!this.itemArr[index]) {
              this.itemArr[index] = [item];
            } else {
              this.itemArr[index].push(item);
            }
          });
          console.log(this.indexList);
          console.log(this.list);
          console.log(this.itemArr);
        })
        .catch((err) => {
          console.warn("getFriendList error:", err);
        });
    },
    rightClick() {
      if (!this.$refs.tooltipRef.show) {
        this.$refs.tooltipRef.showFn(true);
      }
    },
    itemChange(item) {
      uni.navigateTo({
        url: `/pages/info?id=${item.userID}`,
      });
    },
    routePath(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.page,
.pages {
  height: 100%;
  .red {
    border-radius: 50%;
    background-color: red;
    color: #fff;
    min-width: 30rpx;
    height: 35rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
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
.search {
  position: sticky;
  top: calc(100rpx + var(--status-bar-height));
  margin: 0 20rpx 20rpx;
  padding: 15rpx;
  background-color: $white;
  border-radius: 8rpx;
  color: $text-c-2;
}
.main {
  background-color: $white;
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
.back {
  background-color: $white;
  height: 100%;
}
.item {
  .avatar {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
  }
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
/deep/.u-index-list__letter {
  top: 50% !important;
  transform: translateY(-50%);
  .u-index-list__letter__item__index {
    font-size: 28rpx;
  }
}
/deep/.u-fade-enter-active {
  top: 50% !important;
  transform: translateY(-50%) !important;
}
/deep/.u-index-list {
  height: calc(100% - 50px - 100rpx - var(--status-bar-height));
  uni-scroll-view {
    height: 100% !important;
    max-height: 100% !important;
  }
  .u-index-anchor {
    position: relative;
    top: none;
  }
}
</style>
