<template>
  <ToolbarItemContainer
    :iconFile="wordsIcon"
    title="常用语"
    :needBottomPopup="true"
    :iconWidth="isUniFrameWork ? '26px' : '20px'"
    :iconHeight="isUniFrameWork ? '26px' : '20px'"
    ref="container"
  >
    <div :class="['words', !isPC && 'words-h5']">
      <div :class="['words-header', !isPC && 'words-h5-header']">
        <span :class="['words-header-title', !isPC && 'words-h5-header-title']">
          {{ TUITranslateService.t("Words.常用语-快捷回复工具") }}
        </span>
        <span
          v-if="!isPC"
          :class="['words-header-close', !isPC && 'words-h5-header-close']"
          @click="closeDialog"
        >
          关闭
        </span>
      </div>
      <ul :class="['words-list', !isPC && 'words-h5-list']">
        <li
          :class="['words-list-item', !isPC && 'words-h5-list-item']"
          v-for="(item, index) in wordsList"
          :key="index"
          @click="selectWord(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </ToolbarItemContainer>
</template>
<script setup lang="ts">
import {
  TUIGlobal,
  TUITranslateService,
  TUIStore,
  StoreName,
  IConversationModel,
  SendMessageParams,
  TUIChatService,
} from "@tencentcloud/chat-uikit-engine";
import { ref } from "../../../../adapter-vue";
import ToolbarItemContainer from "../toolbar-item-container/index.vue";
import wordsIcon from "../../../../assets/icon/words.svg";
import { wordsList } from "../../utils/wordsList";
import { isUniFrameWork } from "../../../../utils/is-uni";

const isPC = ref(TUIGlobal.getPlatform() === "pc");
const currentConversation = ref<typeof IConversationModel>();
const container = ref();

TUIStore.watch(StoreName.CONV, {
  currentConversation: (conversation: typeof IConversationModel) => {
    currentConversation.value = conversation;
  },
});

const selectWord = (item: any) => {
  const options = {
    to:
      currentConversation?.value?.groupProfile?.groupID ||
      currentConversation?.value?.userProfile?.userID,
    conversationType: currentConversation?.value?.type,
    payload: {
      text: item.value,
    },
  } as typeof SendMessageParams;
  TUIChatService.sendTextMessage(options);
  // 提交后关闭 dialog
  // close dialog after submit evaluate
  container?.value?.toggleDialogDisplay(false);
};

const closeDialog = () => {
  container?.value?.toggleDialogDisplay(false);
};
</script>
<style scoped lang="scss" src="./style/index.scss"></style>
