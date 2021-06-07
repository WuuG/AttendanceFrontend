import { request } from './request';

const getdictionaries = (curPage, pageSize) => {
  return request({
    url: '/sys-parameters',
    params: {
      curPage,
      pageSize
    }
  }, 'get')
}

export {
  getdictionaries
}