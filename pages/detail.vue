<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      title=""
      autoBack
      fixed
      bgColor="#ffffff"
      leftIconSize="30rpx"
      safe-area-inset-top
      height="100rpx"
      titleStyle="color:#000;font-size:28rpx;"
    >
    </u-navbar>
    <view class="flex p-14 justify-between back">
      <view class="flex items-center">
        <u-avatar :src="items.avatar" size="90"></u-avatar>
        <view class="pl-12">
          <view class="text"> {{ items.nick }} </view>
          <view class="con"> 账号：{{ items.userID }} </view>
        </view>
      </view>
    </view>
    <view class="w-full mt-10 pb-10 back">
      <view class="p-10"> 留言： </view>
      <view class="text-c-2 wording">
        {{ items.wording }}
      </view>
    </view>
    <view class="from mt-10" v-if="items.type === 'Pendency_Type_ComeIn'">
      <u-input
        type="text"
        placeholder="请输入备注名"
        clearable
        border="none"
        :maxlength="5"
        v-model="name"
      ></u-input>
    </view>
    <view
      class="row blue back"
      v-if="items.type === 'Pendency_Type_ComeIn'"
      @click="submit"
    >
      同意
    </view>
    <view
      class="row back"
      v-if="items.type === 'Pendency_Type_ComeIn'"
      @click="errorChange"
    >
      拒绝
    </view>
    <view class="row back" @click="delChange" v-else> 删除申请 </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      items: {},
      name: "",
      list: [],
    };
  },
  onLoad(e) {
    this.dataFn(e.id);
  },
  methods: {
    // 同意
    submit() {
      uni.$chat
        .acceptFriendApplication({
          userID: this.items.userID,
          remark: this.name,
          type: this.items.type,
        })
        .then((data) => {
          this.$base.show("添加成功");
          uni.redirectTo({
            url: `/pages/info?id=${this.items.userID}`,
          });
        });
    },
    // 拒绝
    errorChange() {
      uni.$chat
        .refuseFriendApplication({
          userID: this.items.userID,
        })
        .then((data) => {
          this.$base.show("拒绝成功");
          uni.navigateBack({
            delta: 1,
          });
        });
    },
    // 删除申请
    delChange() {
      uni.$chat
        .deleteFriendApplication({
          userID: this.items.userID,
          type: this.items.type,
        })
        .then((data) => {
          this.$base.show("拒绝成功");
          uni.navigateBack({
            delta: 1,
          });
        });
    },
    dataFn(id) {
      uni.$chat
        .getFriendApplicationList({
          userIDList: [id],
        })
        .then(({ data }) => {
          this.list = data.friendApplicationList;
          this.items = this.list.find((item) => item.userID === id);
          console.log(this.items);
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  .back {
    background-color: $white;
  }
  .text {
    font-size: 28rpx;
    padding-bottom: 10rpx;
  }
  .con {
    font-size: 24rpx;
  }
  .ul {
    border-top: 10rpx solid #eff0f3;
  }
  .row {
    border-top: 10rpx solid #eff0f3;
    color: red;
    text-align: center;
    padding: 20rpx 0;
    &.blue {
      color: #007aff;
    }
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
.from {
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #fff;
}
.wording {
  padding: 20rpx;
  background-color: #eee;
  border-radius: 8rpx;
  width: calc(100% - 40rpx);
  margin: 20rpx;
}
</style>
