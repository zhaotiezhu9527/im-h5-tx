import { TUIChatKit, genTestUserSig } from "../TUIKit";
import { vueVersion } from "../TUIKit/adapter-vue";
import { TUILogin } from "@tencentcloud/tui-core";
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
  // 必填信息
  const config = {
    userID: "test01", //User ID
    SDKAppID: 1600002539, // Your SDKAppID
    secretKey:
      "e05fb6e437025f12385953543c200b3ec90502e6286fdf69eb40a12d0269bdec", // Your secretKey
  };
  const userSig = genTestUserSig(config).userSig;
  uni.$chat_SDKAppID = config.SDKAppID;
  uni.$chat_userID = config.userID;
  uni.$chat_userSig = userSig;

  // TUIChatKit 初始化
  TUIChatKit.init();

  // TUICore login
  TUILogin.login({
    SDKAppID: uni.$chat_SDKAppID,
    userID: uni.$chat_userID,
    // UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。
    // 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688
    userSig: uni.$chat_userSig,
    // 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true
    useUploadPlugin: true,
    // 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航
    // 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139
    // 如果您已购买内容审核服务，开启此功能请设置为 true
    useProfanityFilterPlugin: false,
    framework: `vue${vueVersion}`, // 当前开发使用框架 vue2 / vue3
  });
};
