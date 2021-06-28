const setLocalStorge = (key, value) => {
  const valueStr = JSON.stringify(value)
  window.localStorage.setItem(key, valueStr)
}
const getLocalStorge = (key) => {
  const str = window.localStorage.getItem(key)
  const value = JSON.parse(str)
  return value
}
const KEY = {
  ROLE: 'role',
  USERINFO: 'userInfo',
}

export {
  setLocalStorge,
  getLocalStorge,
  KEY
}