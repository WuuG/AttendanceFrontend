import { request } from "./request"

export function authLoginByPassword(account, password) {
  return request({
    url: "/auth/login",
    data: {
      "account": account,
      "password": password,
    }
  }, 'post')
}
export function authLoginByPhone(account, smsCode) {
  return request({
    url: "/auth/login",
    data: {
      "account": account,
      "smsCode": smsCode
    }
  }, 'post')
}
export function signup(signupInfo) {
  return request({
    url: '/users',
    data: signupInfo,
  }, 'post')
}
export function sendRegisterSms(type, phone) {
  return request({
    url: '/sms',
    data: {
      type: type,
      phone
    }
  }, 'post')
}
export function vertifyCode(type, phone, code) {
  return request({
    url: '/sms/' + type + '/' + phone + '/' + code
  }, 'post')
}
export function accountUnique(account) {
  return request({
    url: '/account/unique/' + account,

  }, 'get')
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