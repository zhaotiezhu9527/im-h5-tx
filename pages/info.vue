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
          <view class="text"> {{ infos.remark || items.nick }} </view>
          <view class="con"> 账号：{{ items.userID }} </view>
        </view>
      </view>
    </view>
    <view class="back">
      <u-cell-group>
        <u-cell
          v-if="['CheckResult_Type_BothWay'].includes(relation)"
          title="备注名"
          :isLink="true"
          arrow-direction="left"
          @click="change('/pages/name', '备注名')"
        ></u-cell>
      </u-cell-group>
    </view>
    <view class="back ul">
      <u-cell-group>
        <u-cell title="性别" :value="genderFn()"></u-cell>
        <u-cell title="个性签名" :value="items.selfSignature"></u-cell>
      </u-cell-group>
    </view>
    <view
      class="back ul"
      v-if="['CheckResult_Type_BothWay'].includes(relation) || type === 'black'"
    >
      <u-cell-group>
        <u-cell title="黑名单">
          <template #value>
            <u-switch
              v-model="value"
              @change="blackChange"
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
      v-if="['CheckResult_Type_BothWay'].includes(relation) && !message"
    >
      聊天
    </view>
    <view
      class="row blue back"
      v-if="
        ['CheckResult_Type_NoRelation'].includes(relation) && type !== 'black'
      "
      @click="add"
    >
      添加好友
    </view>
    <view
      class="row back"
      @click="show = true"
      v-if="['CheckResult_Type_BothWay'].includes(relation)"
    >
      删除
    </view>
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
import TencentCloudChat from "@tencentcloud/chat";
import { TUIConversationService } from "@tencentcloud/chat-uikit-engine";
export default {
  data() {
    return {
      items: {},
      infos: {},
      type: "",
      relation: "",
      show: false,
      value: false,
      message: "", // 消息内容进来的，
    };
  },
  onLoad(e) {
    // 获取其他用户信息
    this.dataFn(e.id);
    //好友或者自己的资料更新
    let onProfileUpdated = function (event) {
      this.dataFn(e.id);
    };
    uni.$chat.on(uni.$tx.EVENT.PROFILE_UPDATED, onProfileUpdated);
    this.type = e.type;
    this.message = e.message;
  },
  onShow() {
    if (this.items.userID) {
      this.dataFn(this.items.userID);
    }
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
    change(path, type) {
      uni.navigateTo({
        url: `${path}?type=${type}&id=${this.items.userID}`,
      });
    },
    // 聊天
    service() {
      uni.$chat
        .getConversationProfile(`C2C${this.items.userID}`)
        .then(({ data }) => {
          TUIConversationService.switchConversation(
            data.conversation.conversationID
          ).catch(() => {
            this.$base.show("进入回话失败");
          });
          uni.navigateTo({
            url: "/TUIKit/components/TUIChat/index",
          });
        })
        .catch((err) => {
          console.warn("打开会话失败", err, err);
        });
    },
    dataFn(id) {
      uni.$chat
        .getUserProfile({
          userIDList: [id],
        })
        .then(({ data }) => {
          this.items = data[0];
          this.friendFn(id);
          this.checkFriendFn();
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
    // 获得好友数据
    friendFn(id) {
      uni.$chat
        .getFriendProfile({
          userIDList: [id],
        })
        .then(({ data }) => {
          if (data.friendList.length) {
            this.infos = data.friendList[0];
          }
        })
        .catch(function (imError) {
          console.warn("getMyProfile error:", imError); // 获取个人资料失败的相关信息
        });
    },
    // 获取好友的关系
    checkFriendFn() {
      // 双向校验
      uni.$chat
        .checkFriend({
          userIDList: [this.items.userID],
          type: uni.$tx.TYPES.SNS_CHECK_TYPE_BOTH,
        })
        .then((imResponse) => {
          const { successUserIDList, failureUserIDList } = imResponse.data;
          // 校验成功的 userIDList
          successUserIDList.forEach((item) => {
            const { userID, code, relation } = item; // 此时 code 始终为0
            this.relation = relation;
            console.log("relation", relation);
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_NO_RELATION A 的好友表中没有 B，但无法确定 B 的好友表中是否有 A
            // - relation: TencentCloudChat.TYPES.SNS_TYPE_A_WITH_B A 的好友表中有 B，但无法确定 B 的好友表中是否有 A

            this.value = relation === uni.$tx.TYPES.SNS_TYPE_NO_RELATION;
          });
          // 校验失败的 userIDList
          failureUserIDList.forEach((item) => {
            const { userID, code, message } = item;
          });
        });
    },
    // 添加好友
    add() {
      uni.navigateTo({
        url: `/pages/remark?id=${this.items.userID}`,
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
            // 检测是否有会话，有则删除
            uni.$chat
              .getConversationList([`C2C${this.items.userID}`])
              .then(({ data }) => {
                if (data.conversationList.length) {
                  uni.$chat
                    .deleteConversation(`C2C${this.items.userID}`)
                    .then(() => {
                      let index = uni.$chat.getTotalUnreadMessageCount();
                      this.$base.TabBarBadgeFn(index);
                    });
                }
              });
            this.show = false;
            this.dataFn(this.items.userID);
          }
        });
    },
    blackChange(e) {
      if (e) {
        // 移入黑名单
        uni.$chat
          .addToBlacklist({ userIDList: [this.items.userID] })
          .then(({ data }) => {
            // 删除会话，不删除记录
            this.type = "black";
            this.dataFn(this.items.userID);
            uni.$chat
              .getConversationList([`C2C${this.items.userID}`])
              .then(({ data }) => {
                if (data.conversationList.length) {
                  uni.$chat
                    .deleteConversation({
                      conversationIDList: [`C2C${this.items.userID}`],
                      clearHistoryMessage: false,
                    })
                    .then(() => {
                      let index = uni.$chat.getTotalUnreadMessageCount();
                      this.$base.TabBarBadgeFn(index);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              });
          })
          .catch((data) => {
            this.value = !this.value;
          });
      } else {
        // 移除黑名单
        uni.$chat
          .removeFromBlacklist({ userIDList: [this.items.userID] })
          .then((data) => {
            this.type = "";
            this.addFriend();
          })
          .catch((data) => {
            this.value = !this.value;
          });
      }
    },
    // 移除黑名单默认添加一次好友，（无感添加）
    addFriend() {
      uni.$chat
        .addFriend({
          to: this.items.userID,
          source: "AddSource_Type_Web",
          remark: this.items.remark,
          groupName: "好友",
          type: TencentCloudChat.TYPES.SNS_ADD_TYPE_BOTH, // 双向添加
        })
        .then((data) => {
          this.dataFn(this.items.userID);
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
    font-size: 32rpx;
    padding-bottom: 10rpx;
  }
  .con {
    font-size: 28rpx;
  }
  .ul {
    border-top: 10rpx solid #eff0f3;
  }
  .row {
    border-top: 10rpx solid #eff0f3;
    color: red;
    text-align: center;
    padding: 24rpx 0;
    font-size: 30rpx;
    &.blue {
      color: #007aff;
    }
  }
  .copy {
    width: 30rpx;
    margin-left: 6rpx;
  }
}

/deep/.u-cell__body {
  padding: 26rpx 30rpx;
  font-size: 30rpx;
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
