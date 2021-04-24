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