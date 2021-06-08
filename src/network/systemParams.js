
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
const deleteParam = (code) => {
  return request({
    url: `/sys-parameters/${code}`
  }, 'delete')
}

export {
  getParams,
  addParams,
  deleteParam
}