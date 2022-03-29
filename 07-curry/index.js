/**
 * 手写函数柯里化
 * @param fn
 * @param args
 * @returns {*}
 */
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// 测试
// 普通函数1
function fn(a, b, c, d, e) {
  console.log(a, b, c, d, e)
}

// 普通函数2
function fn2(a, b, c, d, e) {
  console.log(a + b + c + d + e)
}

// 生成的柯里化函数
const _fn = curry(fn)
const _fn2 = curry(fn2)

_fn(1, 2, 3, 4, 5) //--> 1 2 3 4 5
_fn(1)(2)(3, 4, 5) //--> 1 2 3 4 5
_fn(1, 2)(3, 4)(5) //--> 1 2 3 4 5
_fn(1)(2)(3)(4)(5) //--> 1 2 3 4 5
console.log('-----------------------')
_fn2(1, 2, 3, 4, 5)
_fn2(1)(2)(3)(4)(5)



