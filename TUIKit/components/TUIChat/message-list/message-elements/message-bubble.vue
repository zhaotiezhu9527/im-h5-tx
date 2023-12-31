<template>
  <div
    class="message-bubble"
    :class="[message.flow === 'in' ? '' : 'reverse']"
    ref="htmlRefHook"
  >
    <!-- todo 统一组件处理-->
    <img
      class="avatar"
      :src="
        message.avatar ||
        'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
      "
      onerror="this.src='https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'"
      @click="onAvatarClick(message)"
    />
    <main class="message-area">
      <label
        class="name"
        v-if="message.flow === 'in' && message.conversationType === 'GROUP'"
      >
        {{ message.nameCard || message.nick || message.from }}
      </label>
      <div
        :class="[
          'content',
          `content-${message.flow}`,
          message.type === TYPES.MSG_IMAGE ? 'content-image' : '',
          message.type === TYPES.MSG_VIDEO ? 'content-video' : '',
        ]"
      >
        <slot />
      </div>
    </main>
    <label
      class="message-label fail"
      v-if="message.status === 'fail'"
      @click="resendMessage()"
      >!</label
    >
    <Icon
      :file="loading"
      class="message-label identifier"
      :width="'15px'"
      :height="'15px'"
      v-if="message.status === 'unSend'"
    ></Icon>
    <label
      class="message-label"
      :class="[!message.isPeerRead && 'unRead']"
      v-if="
        message.conversationType === 'C2C' &&
        message.flow == 'out' &&
        message.status === 'success'
      "
    >
      <span v-if="!message.isPeerRead">未读</span>
      <span v-else>已读</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "../../../../adapter-vue";
import TUIChatEngine from "@tencentcloud/chat-uikit-engine";
import Icon from "../../../common/Icon.vue";
import loading from "../../../../assets/icon/loading.png";
const emits = defineEmits(["resendMessage"]);
const props = defineProps({
  messageItem: {
    type: Object,
    default: () => ({}),
  },
});

const message = ref();
const TYPES = ref(TUIChatEngine.TYPES);
watchEffect(() => {
  message.value = props.messageItem;
});

const resendMessage = () => {
  emits("resendMessage");
};

function onAvatarClick(item) {
  console.log(item);
  if (item.flow === "out") {
    uni.switchTab({
      url: "/pages/user",
    });
  } else {
    uni.navigateTo({
      url: `/pages/info?id=${item.from}&message=message`,
    });
  }
}
</script>
<style lang="scss" scoped>
.reverse {
  flex-direction: row-reverse;
  justify-content: flex-start;
}
.avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 10rpx;
}
.message-bubble {
  width: 100%;
  display: flex;
  padding-bottom: 10rpx;
}
.line-left {
  border: 1rpx solid rgba(0, 110, 255, 0.5);
}
.message-reference-area {
  display: flex;
  background: #f2f2f2;
  border-radius: 0.5rem;
  border-radius: 0.63rem;
  align-self: start;
  margin-left: 88rpx;
  margin-right: 16rpx;
  &-show {
    width: 100%;
    display: flex;
    flex-direction: inherit;
    justify-content: center;
    padding: 12rpx;
    p {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 0.88rem;
      color: #999999;
      letter-spacing: 0;
      word-break: keep-all;
      padding-right: 10rpx;
    }
    span {
      height: 1.25rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 0.88rem;
      color: #999999;
      letter-spacing: 0;
      display: inline-block;
    }
  }
}
.message-replies {
  display: flex;
  align-self: start;
  margin-left: 88rpx;
  margin-right: 16rpx;
  padding: 4rpx;
  color: #999999;
  font-size: 20rpx;
  i {
    margin: 8rpx;
  }
  span {
    line-height: 40rpx;
  }
}
.message-reference-area-reverse,
.message-replies-reverse {
  align-self: end;
  margin-right: 88rpx;
  margin-left: 16rpx;
}

.face-box {
  display: flex;
  align-items: center;
}
.text-img {
  width: 40rpx;
  height: 40rpx;
}
.message-audio {
  padding-left: 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  .icon {
    margin: 0 8rpx;
  }
  audio {
    width: 0;
    height: 0;
  }
}
.reserve {
  flex-direction: row-reverse;
}
.message-area {
  max-width: calc(100% - 108rpx);
  // position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  .name {
    padding-bottom: 4px;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;
    letter-spacing: 0;
  }
  .reference-content {
    padding: 24rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: burlywood;
    letter-spacing: 0;
    word-wrap: break-word;
    word-break: break-all;
    animation: reference 800ms;
  }
  @-webkit-keyframes reference {
    from {
      opacity: 1;
    }
    50% {
      background-color: #ff9c19;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes reference {
    from {
      opacity: 1;
    }
    50% {
      background-color: #ff9c19;
    }
    to {
      opacity: 1;
    }
  }
  .content {
    padding: 24rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #000000;
    letter-spacing: 0;
    word-wrap: break-word;
    word-break: break-all;
    width: fit-content;
    &-in {
      background: #fbfbfb;
      border-radius: 0px 20rpx 20rpx 20rpx;
    }
    &-out {
      background: #59be68;
      border-radius: 20rpx 0px 20rpx 20rpx;
      color: #fff;
    }
    &-image {
      padding: 0px;
      background: transparent;
      height: fit-content;
      border-radius: 20rpx 0px 20rpx 20rpx;
    }
    &-video {
      padding: 0px;
      height: fit-content;
      background: transparent;
      border-radius: 20rpx;
    }
  }
}
.message-label {
  align-self: flex-end;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 24rpx;
  color: #b6b8ba;
  word-break: keep-all;
  &.identifier {
    animation: identifier 0.5s linear infinite;
  }
}
.fail {
  width: 30rpx;
  height: 30rpx;
  border-radius: 30rpx;
  background: red;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.unRead {
  color: #679ce1;
}
.dropdown-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

@keyframes identifier {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
