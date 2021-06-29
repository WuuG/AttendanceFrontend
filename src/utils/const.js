export default {
  GITEE: {
    BASEURL: 'https://gitee.com/oauth/authorize',
    CLINET_ID: 'b8d0614faf7409487b3d5aceb120d9c24b8f3ae62b94a5d0c6f77e1c8691c5fb',
    REDIRECT_URL: encodeURIComponent('http://localhost:8080/#/passport/login')
    // REDIRECT_URL: 'http://ad.keepdev.top:8080/oauth/callback/gitee'
  },
  //RE:regular expression
  RE: {
    PHONE_NUM: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
    PASSWORD: /^[a-zA-Z0-9~!@#$%^&*()+{}|:"<>?,./;'_]{6,20}$/,
    SMSCODE: /^\d{4,6}$/,
    ACCOUNT: /(^[a-zA-Z]([a-zA-Z0-9_]{3,19})$)|(^(\+86)?1[3-9]\d{9}$)|(^[a-zA-Z][a-zA-Z0-9]{2,19}@([a-zA-Z0-9]\.)+[a-zA-Z0-9]{2,}$)/
  },
  RE_TEXT: {
    PHONE_NUM: '请输入正确的手机号!',
    PASSWORD: '仅支持字母，数字与常见特殊符号',
    SMSCODE: '请输入4-6位验证码',
    ACCOUNT: '请输入正确的用户名、邮箱、手机号等',
  },
  IMG_BASEURL: 'http://attendance.keepdev.top',
  // IMG_BASEURL: 'http://172.17.169.27:8080',
}