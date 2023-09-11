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
    <view class="px-10 back">
      <u-cell-group>
        <u-cell
          title="备注名"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/name', '备注名')"
        ></u-cell>
      </u-cell-group>
    </view>
    <view class="px-10 back ul">
      <u-cell-group>
        <u-cell title="生日"></u-cell>
        <u-cell title="手机"></u-cell>
        <u-cell title="邮箱"></u-cell>
        <u-cell title="个性签名"></u-cell>
      </u-cell-group>
    </view>
    <view class="px-10 back ul" v-if="relation === 'CheckResult_Type_BothWay'">
      <u-cell-group>
        <u-cell title="黑名单">
          <template #value>
            <u-switch
              v-model="value"
              activeColor="#59be68"
              size="50"
            ></u-switch>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
    <view
      class="row blue back"
      @click="service"
      v-if="relation === 'CheckResult_Type_BothWay'"
    >
      聊天
    </view>
    <view class="row blue back" @click="add" v-else> 添加好友 </view>
    <view class="row back" @click="show = true"> 删除 </view>
    <u-modal
      :show="show"
      @cancel="show = false"
      @confirm="confirm"
      ref="uModal"
      title="删除"
      showCancelButton
    >
      <view>确定删除该好友吗？</view>
    </u-modal>
  </view>
</template>
<script>
import TUICore, { TUIConstants } from "@tencentcloud/tui-core";
import TencentCloudChat from "@tencentcloud/chat";
export default {
  data() {
    return {
      items: {},
      relation: "",
      show: false,
      value: false,
    };
  },
  onLoad(e) {
    // 获取其他用户信息
    this.dataFn(e.id);
  },
  methods: {
    change(path, type) {
      uni.navigateTo({
        url: `${path}?type=${type}`,
      });
    },
    // 聊天
    service() {
      TUICore.callService({
        serviceName: TUIConstants.TUIConversation.SERVICE.NAME,
        method: TUIConstants.TUIConversation.SERVICE.METHOD.CREATE_CONVERSATION,
        params: {
          data: {
            name: "isC2C",
          },
          userIDList: [this.items.userID],
        },
      });
      // 获取会话列表是否友会话，有则进入会话，无则创建会话

      // TUIConversationService.switchConversation(this.items.conversationID).catch(
      // () => {
      // this.$base.show("进入回话失败");
      // }
      // );
      // uni.navigateTo({
      // url: "/TUIKit/components/TUIChat/index",
      // });
    },
    dataFn(id) {
      uni.$chat
        .getUserProfile({
          userIDList: [id],
        })
        .then(({ data }) => {
          this.items = data[0];
          console.log(data);
          this.checkFriendFn();
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
    // 获取好友的关系
    checkFriendFn() {
      uni.$chat
        .checkFriend({
          userIDList: [this.items.userID],
          type: TencentCloudChat.TYPES.SNS_CHECK_TYPE_BOTH,
        })
        .then((imResponse) => {
          const { successUserIDList, failureUserIDList } = imResponse.data;
          // 校验成功的 userIDList
          successUserIDList.forEach((item) => {
            const { userID, code, relation } = item; // 此时 code 始终为0
            this.relation = relation;
            // 单向校验好友关系时可能的结果有：
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_NO_RELATION A 的好友表中没有 B，但无法确定 B 的好友表中是否有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_A_WITH_B A 的好友表中有 B，但无法确定 B 的好友表中是否有 A
            // 双向校验好友关系时可能的结果有：
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_NO_RELATION A 的好友表中没有 B，B 的好友表中也没有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_A_WITH_B A 的好友表中有 B，但 B 的好友表中没有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_B_WITH_A A 的好友表中没有 B，但 B 的好友表中有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_BOTH_WAY A 的好友表中有 B，B 的好友表中也有 A
          });
          // 校验失败的 userIDList
          failureUserIDList.forEach((item) => {
            const { userID, code, message } = item;
            console.log(item);
          });
        });
    },
    // 添加好友
    add() {
      uni.$chat
        .addFriend({
          to: this.items.userID,
          source: "AddSource_Type_Web",
          // remark: "",
          groupName: "好友",
          // wording: "我是" + this.items.nick,
          type: TencentCloudChat.TYPES.SNS_ADD_TYPE_BOTH,
        })
        .then((imResponse) => {
          // 添加好友的请求发送成功
          this.dataFn(this.items.userID);
          const { code } = imResponse.data;
          if (code === 30539) {
            this.$base.show("提交成功，等待对方验证！");
            // 30539 说明 user1 设置了【需要经过自己确认对方才能添加自己为好友】，此时 SDK 会触发 TencentCloudChat.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
          } else if (code === 0) {
            this.$base.show("添加好友成功！");
            // 0 说明 user1 设置了【允许任何人添加自己为好友】，此时 SDK 会触发 TencentCloudChat.EVENT.FRIEND_LIST_UPDATED 事件
          }
        });
    },
    // 删除好友
    confirm() {
      uni.$chat
        .deleteFriend({
          userIDList: [this.items.userID],
          type: TencentCloudChat.TYPES.SNS_DELETE_TYPE_BOTH,
        })
        .then(({ data }) => {
          if (data.successUserIDList.length) {
            this.$base.show("删除成功！");
            this.show = false;
            this.dataFn(this.items.userID);
          }
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
</style>
