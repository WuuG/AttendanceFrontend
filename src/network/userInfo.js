import { request } from "./request"

export function getUserInfo(uid) {
  return request({
    url: "/user/",
    params: {
      uid
    }
  }, 'get')
}