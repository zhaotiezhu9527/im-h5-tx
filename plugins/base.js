import { TUIChatKit } from "../TUIKit";
import { TUILogin } from "@tencentcloud/tui-core";
import TencentCloudChat from "@tencentcloud/chat";
import TIMUploadPlugin from "tim-upload-plugin";
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";

//获取用户信息
//设置缓存内容
export const storage = (name, value) => {
  uni.setStorage({
    key: name,
    data: value,
  });
};
//通用提示
export const show = (title, icon = "none") => {
  uni.showToast({
    title: title,
    duration: 2000,
    icon: icon,
  });
};
//loading
export const loading = (title) => {
  uni.showLoading({
    title: title,
  });
};
const PATH_URL =
  process.env.NODE_ENV === "development"
    ? "http://im.juhai.xyz/"
    : "http://im.juhai.xyz/";

export const upload = (params) => {
  let header = {
    token: uni.getStorageSync("token"),
  };
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: PATH_URL + "api_common/upload/uploading",
      filePath: params.filePath,
      name: params.name,
      header: header,
      formData: params.formData,
      success: (uploadFileRes) => {
        resolve(uploadFileRes);
      },
    });
  });
};
//请求
export const request = (params) => {
  let str = params.method.toUpperCase();
  if (str == "POST") {
    params.header = {
      lang: "zh_CN",
      "Content-Type":
        params["Content-Type"] === undefined
          ? "application/x-www-form-urlencoded;charset=UTF-8"
          : params["Content-Type"],
      token: uni.getStorageSync("token"),
    };
  } else {
    params.header = {
      lang: "zh_CN",
      token: uni.getStorageSync("token"),
    };
  }
  if (params.loading) {
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: PATH_URL + params.url,
      data: params.data,
      method: str,
      header: params.header,
      sslVerify: false,
      success: (res) => {
        if (res.data.code == -2) {
          uni.redirectTo({
            url: "/pages/login",
          });
          uni.removeStorageSync("token");
          show(res.data.msg);
        } else if (res.data.code != 0) {
          uni.showToast({
            title: res?.data?.msg || "存在网络异常",
            duration: 2000,
            icon: "none",
          });
        }
        resolve(res);
      },
      fail: (e) => {
        show("存在网络异常");
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
};

export const configFn = (params) => {
  // TUIChatKit 初始化
  TUIChatKit.init();
  TUILogin.login({
    userID: params.userID,
    SDKAppID: 1600002539, // Your SDKAppID
    userSig: params.userSig,
    useUploadPlugin: true,
    useProfanityFilterPlugin: false,
  })
    .then(() => {
      let options = {
        SDKAppID: 1600002539, // 接入时需要将0替换为您的即时通信应用的 SDKAppID
      };
      let chat = TencentCloudChat.create(options);
      chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
      chat.registerPlugin({
        "tim-profanity-filter-plugin": TIMProfanityFilterPlugin,
      });
      uni.$chat = chat;
      uni.$tx = TencentCloudChat;

      setTimeout(() => {
        let onMessageReceived = function (event) {
          // event.data - 存储 Message 对象的数组 - [Message]
        };
        chat.on(uni.$tx.EVENT.MESSAGE_RECEIVED, onMessageReceived);

        let index = uni.$chat.getTotalUnreadMessageCount();
        // 获取消息总数
        TabBarBadgeFn(index);

        // 监听消息总数
        let onTotalUnreadMessageCountUpdated = (event) => {
          TabBarBadgeFn(event.data);
        };
        chat.on(
          uni.$tx.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED,
          onTotalUnreadMessageCountUpdated
        );
        // 好友或者自己的数据变更
        let onProfileUpdated = function (event) {};
        chat.on(TencentCloudChat.EVENT.PROFILE_UPDATED, onProfileUpdated);

        //用户被踢下线时触发
        let onKickedOut = function (event) {
          console.log(event.data.type);
          // TencentCloudChat.TYPES.KICKED_OUT_MULT_ACCOUNT(Web端，同一账号，多页面登录被踢)
          // TencentCloudChat.TYPES.KICKED_OUT_MULT_DEVICE(同一账号，多端登录被踢)
          // TencentCloudChat.TYPES.KICKED_OUT_USERSIG_EXPIRED(签名过期)
          // TencentCloudChat.TYPES.KICKED_OUT_REST_API(REST API kick 接口踢出)
        };
        chat.on(TencentCloudChat.EVENT.KICKED_OUT, onKickedOut);

        // 网络状态
        let onNetStateChange = function (event) {
          // event.data.state 当前网络状态，枚举值及说明如下：
          // TencentCloudChat.TYPES.NET_STATE_CONNECTED - 已接入网络
          // TencentCloudChat.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
          // TencentCloudChat.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
        };
        chat.on(TencentCloudChat.EVENT.NET_STATE_CHANGE, onNetStateChange);
      }, 500);
    })
    .catch((err) => {
      console.log(err);
    });
};

function TabBarBadgeFn(index) {
  if (index) {
    uni.setTabBarBadge({
      index: 0,
      text: index + "",
    });
  } else {
    uni.removeTabBarBadge({
      index: 0,
    });
  }
}
