import { request } from "./request"

export function getUserInfo(uid) {
  return request({
    url: "/users/1",
  }, 'get')
}