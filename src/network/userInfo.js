import { request } from "./request"

export function getUserInfo(uid) {
  return request({
    url: "/users/" + uid,
    // params: {
    //   uid
    // }
  }, 'get')
}