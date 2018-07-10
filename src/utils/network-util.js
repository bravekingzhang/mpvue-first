import Fly from "flyio/dist/npm/wx";
import Vue from "vue";

let instance = null;
let log = console.log;
const tokenUrl = "/api/xiandu/categories";
const baseUrl = "https://gank.io";

class Network {

  constructor() {
    if (!instance) {
      instance = this;
      this.csrfToken = "";
      this.fly = new Fly();
      this.fly.config.headers = { "x-tag": "hoolly-fly" };
      this.fly.config.baseURL = baseUrl;
      this.tokenFly = new Fly();
      this.tokenFly.config = this.fly.config;
      this.hackFly = new Fly();
      this.hackFly.config = this.fly.config;
      Vue.prototype.http = this.fly;
      Vue.prototype.hackHttp = this.hackFly;
      this.init_request_interceptors();
      this.init_response_interceptors();
    }
    return instance;
  }


  init_request_interceptors() {
    this.fly.interceptors.request.use((request) => {
      log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`);
      request.headers["csrfToken"] = this.csrfToken;
    });
  }

  /**
   * 遇到一个坑 TypeError: _this2.tokenFly.get(...).then(...).finally is not a function
   * 所以换成then,catch的写法
   *
   * https://stackoverflow.com/questions/38892549/finally-is-not-a-function-when-using-async-redux-actions-with-promises
   */
  init_response_interceptors() {
    //  response interceptors
    this.fly.interceptors.response.use(
      (response) => {
        log("interceptors.response", response);
        //验证失效
        if (response.status === 401) {
          log("token失效，重新请求token...");
          this.fly.lock(); //锁定响应拦截器
          return this.tokenFly.get(tokenUrl)
            .then((d) => {
              this.csrfToken = "new token";
              log("token已更新，值为: " + this.csrfToken);
              this.fly.unlock();
              log(`将会重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`);
              return this.fly.request(response.request);
            })
            .catch((reason) => {
              this.fly.unlock();
              log(`token 刷新失败：status:${reason.status}, response.data:${reason.response.data}`);
              return response;
            });
        } else {
          return response.data.data;
        }
      },
      (err) => {
        log("error-interceptor", err);
      }
    );
  }

}

let network = new Network();
export default network;
