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
export function signup(signupInfo) {
  return request({
    url: '/users',
    data: signupInfo,
  }, 'post')
}
export function sendRegisterSms(phone) {
  return request({
    url: '/sms',
    data: {
      type: 'register',
      phone
    }
  }, 'post')
}

export class SignupInfo {
  constructor(registerInfo) {
    this.loginName = registerInfo.name
    // this.realName = registerInfo.realName
    this.phone = registerInfo.phone
    this.roles = registerInfo.role
    this.password = registerInfo.password
    this.smsCode = registerInfo.code
  }
}