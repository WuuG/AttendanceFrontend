import { request } from "./request"

//通过账户密码登录
export function authLoginByPassword(account, password) {
  return request({
    url: "/auth/login",
    data: {
      "account": account,
      "password": password,
    }
  }, 'post')
}
//通过手机号验证码登录
export function authLoginByPhone(account, smsCode) {
  return request({
    url: "/auth/login",
    data: {
      "account": account,
      "smsCode": smsCode
    }
  }, 'post')
}
//注册表单上传
export function signup(signupInfo) {
  return request({
    url: '/auth/register',
    data: signupInfo,
  }, 'post')
}
//发送短信验证码
export function sendRegisterSms(type, phone) {
  return request({
    url: '/sms',
    data: {
      type: type,
      phone
    }
  }, 'post')
}
//短信验证码验证
export function vertifyCode(type, phone, code) {
  return request({
    url: '/sms/' + type + '/' + phone + '/' + code
  }, 'post')
}
//判断账户是否唯一
export function accountUnique(account) {
  return request({
    url: '/account/unique/' + account,

  }, 'get')
}
//gitee第三方登录
export function giteeAuth() {
  return request({
    url: 'https://gitee.com/oauth/authorize?client_id={b8d0614faf7409487b3d5aceb120d9c24b8f3ae62b94a5d0c6f77e1c8691c5fb}&redirect_uri={redirect_uri}&response_type=code&state={state}',
  }, 'get')
}

export class SignupInfo {
  constructor(registerInfo) {
    this.loginName = registerInfo.name
    // this.realName = registerInfo.realName
    this.phone = registerInfo.phone
    this.roles = registerInfo.roles
    this.password = registerInfo.password
    this.smsCode = registerInfo.code
  }
}