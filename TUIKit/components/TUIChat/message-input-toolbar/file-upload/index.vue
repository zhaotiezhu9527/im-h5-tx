<template>
  <ToolbarItemContainer
    :iconFile="fileIcon"
    title="文件"
    :iconWidth="isUniFrameWork ? '32px' : '21px'"
    :iconHeight="isUniFrameWork ? '25px' : '18px'"
    :needDialog="false"
    @onIconClick="onIconClick"
  >
    <div :class="['file-upload', !isPC && 'file-upload-h5']">
      <input
        title="文件"
        type="file"
        data-type="file"
        accept="*"
        @change="sendFileMessage"
        ref="inputRef"
      />
    </div>
  </ToolbarItemContainer>
</template>
<script lang="ts" setup>
import {
  TUIGlobal,
  TUIChatService,
  TUIStore,
  StoreName,
  IConversationModel,
  SendMessageParams,
} from "@tencentcloud/chat-uikit-engine";
import { ref } from "../../../../adapter-vue";
import { isUniFrameWork } from "../../../../utils/is-uni";

import ToolbarItemContainer from "../toolbar-item-container/index.vue";
import fileIcon from "../../../../assets/icon/files.png";

const emits = defineEmits(["close"]);

const inputRef = ref();
const isPC = ref(TUIGlobal.getPlatform() === "pc");
const currentConversation = ref<typeof IConversationModel>();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: typeof IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const onIconClick = () => {
  if (isUniFrameWork) {
    // uniapp app 不支持选择文件发送
    return;
  } else {
    inputRef?.value?.click && inputRef?.value?.click();
  }
};

const sendFileMessage = (e: any) => {
  if (e?.target?.files?.length <= 0) {
    return;
  }
  const options = {
    to:
      currentConversation?.value?.groupProfile?.groupID ||
      currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type,
    payload: {
      file: e?.target,
    },
  } as typeof SendMessageParams;
  TUIChatService.sendFileMessage(options);
  e.target.value = "";
};
</script>
<style lang="scss" scoped>
@import url(../../../../assets/styles/common.scss);
</style>
