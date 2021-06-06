//防抖函数
export function debounce(func, duration) {
  console.log(11);
  let timer = null;
  return () => {
    console.log(timer);
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this);
    }, duration);
  }

}
export function randomString() {
  let len = 32
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
//获取当前url的参数,返回值为object
export function getCurUrlParmas() {
  const query = window.location.search
  const queryMap = {}
  if (query == '') return null
  query.replace('?', '').split('&').forEach(kv => {
    let [key, value] = kv.split('=')
    queryMap[key] = value;
  })
  console.log('current url：', queryMap);
  return queryMap;
}