/**
 * 手写 bind 方法
 * @param ctx
 * @param args
 * @returns {function(): any}
 */
Function.prototype.myBind = function(ctx, ...args) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Type Error')
  }

  const fn = this

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : ctx, args.concat(...arguments)
    )
  }
}

// 测试
console.log('bind ----------------------------')
const bind_obj = {
  test(a, b, c) {
    console.log(this, a + b)
  }
}
bind_obj.test.myBind(bind_obj, 4, 5)() //--> {test: ƒ} 9
console.log('bind ----------------------------')