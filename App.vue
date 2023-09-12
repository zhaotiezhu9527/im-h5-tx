<script lang="ts">
export default {
  onLaunch: function () {
    uni.getStorage({
      key: "token",
      success: (res) => {
        this.$base.configFn({
          userID: uni.getStorageSync("userID"),
          userSig: uni.getStorageSync("userSig"),
        });
      },
    });
    this.$api.user_checkSign().then(({ data }) => {
      if (!data.valid) {
        uni.removeStorageSync("token");
        uni.removeStorageSync("userID");
        uni.removeStorageSync("SDKAppID");
        uni.removeStorageSync("secretKey");
        uni.redirectTo({ url: "/pages/login" });
      }
    });

    let timeout = 1000 * 60 * 2; // 每隔2分钟检测一次
    setInterval(() => {
      // 检测sign是否过期
      this.$api.user_checkSign().then(({ data }) => {
        if (!data.valid) {
          uni.removeStorageSync("token");
          uni.removeStorageSync("userID");
          uni.removeStorageSync("SDKAppID");
          uni.removeStorageSync("secretKey");
          uni.redirectTo({ url: "/pages/login" });
        }
      });
    }, timeout);
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
