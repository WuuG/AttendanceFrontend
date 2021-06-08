
import { request } from './request';

const getParams = (curPage, pageSize) => {
  return request({
    url: '/sys-parameters',
    params: {
      curPage,
      pageSize
    }
  }, 'get')
}
const addParams = (form) => {
  return request({
    url: '/sys-parameters/',
    data: {
      ...form
    }
  }, 'post')
}

export {
  getParams,
  addParams
}