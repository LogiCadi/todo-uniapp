import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}

const host = "http://127.0.0.1:7001";
// const host = "https://service-eumajiqw-1258011420.gz.apigw.tencentcs.com";

let openid = "";

export function request(url: string, data: any): Promise<{ code: number; data: any }> {
  return new Promise((resolve) => {
    uni.request({
      url: host + "/todo" + url,
      data: { openid, ...data },
      method: "POST",
      async success(res: any) {
        if (res.data.code === 402) {
          // 未登录
          await login();
          const res = await request(url, data);
          resolve(res);
        } else {
          resolve(res.data);
        }
      },
    });
  });
}

export function login() {
  return new Promise((resolve) => {
    uni.login({
      provider: "weixin", //使用微信登录
      async success(res) {
        const { data } = await request("/login", { code: res.code });
        openid = data;
        resolve(res);
      },
    });
  });
}
