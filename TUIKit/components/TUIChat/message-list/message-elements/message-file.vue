<template>
  <div class="message-file">
    <div
      class="box"
      @click="download"
      :title="TUITranslateService.t('TUIChat.单击下载')"
    >
      <Icon :file="files" class="file-icon"></Icon>
      <div class="message-file-content">
        <label>{{ data.name }}</label>
        <span>{{ data.size }}</span>
      </div>
    </div>
    <progress v-if="data.progress" :value="data.progress" max="1"></progress>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "../../../../adapter-vue";
import { TUITranslateService } from "@tencentcloud/chat-uikit-engine";
import Icon from "../../../common/Icon.vue";
import files from "../../../../assets/icon/files.png";

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
});

const data = ref();
watchEffect(() => {
  data.value = props.content;
});

// todo: 区分 web 和 uniapp
const download = () => {
  const file: any = data.value;
  const option: any = {
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };
  // 浏览器支持fetch则用blob下载，避免浏览器点击a标签，跳转到新页面预览的行为
  // If the browser supports fetch, use blob to download, so as to avoid the browser clicking the a tag and jumping to the preview of the new page
  if ((window as any).fetch) {
    fetch(file.url, option)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = file.name;
        a.click();
      });
  } else {
    const a = document.createElement("a");
    a.href = file.url;
    a.target = "_blank";
    a.download = file.name;
    a.click();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/common.scss";
.message-file {
  display: flex;
  flex-direction: column;
  .box {
    flex: 1;
    display: flex;
    cursor: pointer;
    .message-file-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .file-icon {
      margin: auto 8px;
    }
  }
  progress {
    width: 100%;
    color: #006eff;
    appearance: none;
    border-radius: 0.25rem;
    background: rgba(#ffffff, 1);
    width: 100%;
    height: 0.5rem;
    &::-webkit-progress-value {
      background-color: #006eff;
      border-radius: 0.25rem;
    }
    &::-webkit-progress-bar {
      border-radius: 0.25rem;
      background: rgba(#ffffff, 1);
    }
    &::-moz-progress-bar {
      color: #006eff;
      background: #006eff;
      border-radius: 0.25rem;
    }
  }
}
</style>
