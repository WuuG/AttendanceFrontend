import axios from "axios"
import { Message } from 'element-ui';
import { debounce } from 'utils/utils';

let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    const curURL = config.url + '&' + config.method
    // console.log(curURL);
    if (pending[p].u === curURL) {
      // 当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //数组移除当前请求
    }
  }
}

// 通过防抖函数，防止发送多个请求时，跳出多个弹窗
const toKenExpiredHandleDebounce = debounce(toKenExpiredHandle)
// token过期处理
function toKenExpiredHandle() {
  localStorage.removeItem('uid')
  localStorage.removeItem('toKen')
  location.replace('/#/passport/login')
  Message(
    {
      message: '请重新登录',
      type: 'warning'
    }
  )
}

export function request(config, method) {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    method: method,
  })

  instance.interceptors.request.use(config => {
    // 多次发送请求，进行防抖处理
    removePending(config); //在一个axios发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
      // 取出最前端的url路径,并加上其对应方法
      const url = config.url + '&' + config.method
      pending.push({ u: url, f: c });//config.data为请求参数
    });

    const toKen = localStorage.getItem('toKen')
    //添加headrs toKen
    if (toKen) {
      config.headers.Authorization = 'Bearer ' + toKen
      // console.log(config);
    }
    return config
  }, err => {
    console.log(`request interceptors error: ${err}`);
    return Promise.reject(err)
  })

  instance.interceptors.response.use(response => {
    return response.data
  }, err => {
    if (err.response != undefined) {
      Message({
        type: 'error',
        message: err.response.data.message
      })
      switch (err.response.status) {
        case 400:
          console.error('Bad Request');
          return err.response.data;
        case 401:
          console.error('Unauthorized');
          break;
        case 403:
          console.log('Forbidden');
          //进行token过期处理
          toKenExpiredHandleDebounce()
          // toKenExpiredHandle();
          break;
        case 500:
          console.error('Internal Server Error');
          break;
        default:
          console.log(err);
          break;
      }
    }
    return Promise.reject('请求返回时发生了错误' + err);
    // return Promise.reject(err.response.data);
  })
  return instance(config)
}