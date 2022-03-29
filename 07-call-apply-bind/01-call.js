/**
 * 手写 call 方法
 * @param ctx
 * @param args
 * @returns {*}
 */
Function.prototype.myCall = function(ctx, ...args) {
  // 判断调用对象
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }

  // 判断 ctx 是否传入，如果未传入则设置为 window
  ctx = ctx || window

  // 将调用函数设为对象的方法
  ctx.fn = this

  // 调用函数
  const result = ctx.fn(...args)

  // 将属性删除
  delete ctx.fn

  return result
}


// 测试
console.log('call ----------------------------')
const call_obj = {
  test(a, b, c) {
    console.log(this, a, b)
  }
}
call_obj.test.myCall(call_obj, 4, 5) //--> {test: ƒ, fn: ƒ} 4 5
console.log('call ----------------------------')