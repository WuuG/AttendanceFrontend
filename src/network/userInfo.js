import { request } from "./request"

export function getUserInfo() {
  return request({
    url: "/users/1",
  }, 'get')
}