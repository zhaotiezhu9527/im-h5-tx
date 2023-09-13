import Vue from "vue";
import * as base from "plugins/base.js";
Vue.prototype.$base = base;
//统一API资源管理

//登录
export const user_login = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "im-qtapi-test/user/login/V2",
        method: "post",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

//注册
export const user_register = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "im-qtapi-test/user/register/v2",
        method: "post",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

//退出登录
export const user_logout = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "im-qtapi-test/user/logout",
        method: "post",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

// 修改密码
export const user_update_pwd = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "user/updatePwd",
        method: "post",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

export const user_checkSign = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "im-qtapi-test/user/checkSign",
        method: "get",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};
export const system_config = (data) => {
  return new Promise((resolve, reject) => {
    base
      .request({
        url: "im-qtapi-test/system/config",
        method: "get",
        data: data,
      })
      .then((res) => {
        resolve(res);
      });
  });
};
