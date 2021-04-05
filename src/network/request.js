import axios from "axios"

export function request(config, method) {
  const instance = axios.create({
    baseURL: "http://172.17.169.27:8080",
    timeout: 5000,
    method: method,
  })

  instance.interceptors.request.use(config => {
    console.log(config, '拦截发送请求的config');
    return config
  }, err => {
    console.log(err);
    return Promise.reject();
  })

  return instance(config)
}