import axios from "axios"

let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  // console.log('pending', pending);
  for (let p in pending) {
    if (pending[p].u === config.url.split('/')[0] + '&' + config.method) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //数组移除当前请求
    }
  }
}
export function request(config, method) {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    method: method,
  })

  instance.interceptors.request.use(config => {
    const toKen = localStorage.getItem('toKen')
    // console.log(config);
    removePending(config); //在一个axios发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
      pending.push({ u: config.url.split('/')[0] + '&' + config.method, f: c });//config.data为请求参数
    });
    if (toKen) {
      config.headers.Authorization = 'Bearer ' + toKen
      // console.log(config);
    }
    return config
  })

  instance.interceptors.response.use(response => {
    // console.log(response.data);
    return response.data
  }, err => {
    // console.log(err);
    if (err.response != undefined) {
      switch (err.response.status) {
        case 400:
          console.log('Bad Request');
          return err.response.data;
          break;
        case 401:
          console.log('Unauthorized');
          break;
        case 403:
          console.log('Forbidden');
          break;
        case 500:
          console.log('Internal Server Error');
          break;
        default:
          console.log(err);
          break;
      }
    }
    return err.response ? Promise.reject(err.response.data) : Promise.reject('服务器无法访问');
    // return Promise.reject(err.response.data);
  })




  return instance(config)
}