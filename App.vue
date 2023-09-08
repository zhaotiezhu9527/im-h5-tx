<script lang="ts">
export default {
  onLaunch: function () {
    uni.getStorage({
      key: "token",
      success: (res) => {
        this.$base.configFn();
      },
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>
<style lang="scss">
/*每个页面公共css */
@import "./static/utils.scss";
@import "@/uni_modules/uview-ui/index.scss";
/deep/.u-navbar__content {
  z-index: 1024;
}
uni-page-body,
html,
body,
page {
  background-color: #f5f4f6;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}
</style>
