/**
 * 手写 apply 方法
 * @param ctx
 * @returns {*}
 */
Function.prototype.myApply = function(ctx) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }

  let result = null

  // 判断 ctx 是否存在，如果未传入则为 window
  ctx = ctx || window

  // 将函数设为对象的方法
  ctx.fn = this

  // 调用方法
  if (arguments[1]) {
    result = ctx.fn(...arguments[1])
  } else {
    result = ctx.fn()
  }

  // 将属性删除
  delete ctx.fn

  return result
}

// 测试
console.log('apply ----------------------------')
const apply_obj = {
  test(a, b, c) {
    console.log(this, a, b, c)
  }
}
apply_obj.test.myApply(apply_obj, [4, 5, 6]) //--> {test: ƒ, fn: ƒ} 4 5 6
console.log('apply ----------------------------')
