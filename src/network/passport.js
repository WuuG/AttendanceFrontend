import { request } from "./request"

export function authLogin(account, password) {
  return request({
    url: "/auth/login",
    data: {
      "account": account,
      "password": password,
    }
  }, 'post')
}