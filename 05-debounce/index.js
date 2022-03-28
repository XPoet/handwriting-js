function debounce(fn, wait) {
  let timer = null

  return function(...args) {
    const ctx = this

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, wait)
  }
}

// 测试
const testFn = debounce(() => {
  console.log('函数防抖测试 - fn 执行了')
}, 2000)

// 定时器每 1000 毫秒执行一次 testFn 函数，等待时间未大于 2000 毫秒，所以 fn 永远不会执行
setInterval(testFn, 1000)

// 定时器每 3000 毫秒执行一次 testFn 函数，等待时间大于 2000 毫秒，所以 fn 会隔 3000 执行一次
setInterval(testFn, 3000) //--> 函数防抖测试 - fn 执行了