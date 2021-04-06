import axios from "axios"

export function request(config, method) {
  const instance = axios.create({
    baseURL: "http://172.17.169.27:8080",
    timeout: 5000,
    method: method,
  })

  instance.interceptors.request.use(config => {
    const toKen = localStorage.getItem('toKen')
    if (toKen) {
      config.headers.Authorization = 'Bearer' + toKen
      console.log(toKen);
    }
    return config
  })

  instance.interceptors.response.use(response => {
    console.log(response.data);
    return response.data
  }, err => {
    console.log(err.response);
    switch (err.response.status) {
      case 400:
        console.log('Bad Request');
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
    return Promise.reject(err.response.data);
  })




  return instance(config)
}