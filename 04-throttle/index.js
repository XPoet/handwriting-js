/**
 * @param fn 需要执行的函数
 * @param delay 间隔时间
 */
const throttle = (fn, delay = 1000) => {
  // 上一次执行 fn 的时间
  let prevTime = 0

  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒 ms
    const nowTime = Date.now()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于间隔时间就把 prevTime 设置为当前时间并执行函数 fn
    if (nowTime - prevTime > delay) {
      prevTime = nowTime
      fn.apply(this, args)
    }
  }
}

// 测试
const testFn = throttle(() => {
  console.log('函数节流测试 - fn 执行了')
}, 1000)

// 定时器每 100 毫秒执行一次 testFn 函数，但是只有间隔时间差大于 1000 毫秒时才会执行 fn
setInterval(testFn, 100) //--> 函数节流测试 - fn 执行了