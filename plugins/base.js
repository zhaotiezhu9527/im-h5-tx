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
    userSig: uni.$chat_userSig,
    useUploadPlugin: true,
    useProfanityFilterPlugin: false,
    framework: `vue${vueVersion}`,
  });
};
