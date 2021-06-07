import { request } from "./request"

export function getUserInfo(uid) {
  return request({
    url: "/users/" + uid,
  }, 'get')
}

export function getUsers(curPage, pageSize) {
  return request({
    url: '/users',
    params: {
      curPage,
      pageSize
    }
  }, 'get')
}