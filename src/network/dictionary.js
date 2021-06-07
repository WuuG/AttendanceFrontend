import { request } from './request';

const getdictionaries = (curpage, pageSize) => {
  return request({
    url: '/sys-parameters',
    data: {
      curpage,
      pageSize
    }
  }, 'get')
}

export {
  getdictionaries
}