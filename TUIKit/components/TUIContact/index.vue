<template>
  <div :class="[(isShowSelectFriend || isShowContactList) && 'TUI-contact']">
    <SelectFriend v-if="isShowSelectFriend"/>
    <ContactList class="TUI-contact" v-if="isShowContactList" @handleCurrentConversation="handleCurrentConversation">
      <slot />
    </ContactList>
  </div>
</template>
<script lang="ts" setup>
import {
  TUIStore,
  StoreName,
  TUIGlobal,
} from "@tencentcloud/chat-uikit-engine";
import { ref, watchEffect } from "../../adapter-vue";

import SelectFriend from "./select-friend";
import ContactList from "./contact-list";
import { isUniFrameWork } from "../../utils/is-uni";



const emits = defineEmits(["handleCurrentConversation"]);

const props = defineProps({
  isShow: {
    type: Boolean,
    default: true,
  }
})

const isShowSelectFriend = ref(false);
const isShowContactList = ref(true);

watchEffect(() => {
  isShowContactList.value = props.isShow;
})

TUIStore.watch(StoreName.CUSTOM, {
  isShowSelectFriendComponent: (data: any) => {
    if (data) {
      isShowSelectFriend.value = true;
      if(isUniFrameWork) {
        TUIGlobal?.global?.hideTabBar();
      }
    } else {
      isShowSelectFriend.value = false;
      if(isUniFrameWork) {
        TUIGlobal?.global?.showTabBar();
      }
    }
  },
});

const handleCurrentConversation = (data: any) => {
  emits('handleCurrentConversation', data);
}
</script>
<style lang="scss" scoped src="./style/index.scss"></style>
