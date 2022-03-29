/**
 * 手写 Promise
 */
class MyPromise {

  // Promise/A+ 规范规定的三种状态
  PENDING = 'pending' // 等待状态
  FULFILLED = 'fulfilled'// 成功状态
  REJECTED = 'rejected' // 失败状态

  // 构造函数接收一个执行回调
  constructor(executor) {
    this._status = this.PENDING // Promise 初始状态
    this._value = undefined // then 回调的值
    this._resolveQueue = [] // resolve 时触发的成功队列
    this._rejectQueue = [] // reject 时触发的失败队列

    // 使用箭头函数固定 this（resolve 函数在 executor 中触发，不然找不到 this）
    const resolve = value => {
      const run = () => {
        // Promise/A+ 规范规定的 Promise 状态只能从 pending 触发，变成 fulfilled
        if (this._status === this.PENDING) {
          this._status = this.FULFILLED // 更改状态
          this._value = value // 储存当前值，用于 then 回调

          // 执行 resolve 回调
          while (this._resolveQueue.length) {
            const callback = this._resolveQueue.shift()
            callback(value)
          }
        }
      }
      // 把 resolve 执行回调的操作封装成一个函数，放进 setTimeout 里，以实现 Promise 异步调用的特性（规范上是微任务，这里是宏任务）
      setTimeout(run)
    }

    // 同 resolve
    const reject = value => {
      const run = () => {
        if (this._status === this.PENDING) {
          this._status = this.REJECTED
          this._value = value

          while (this._rejectQueue.length) {
            const callback = this._rejectQueue.shift()
            callback(value)
          }
        }
      }
      setTimeout(run)
    }

    // new Promise()时立即执行 executor，并传入 resolve 和 reject
    executor(resolve, reject)
  }

  // then 方法，接收一个成功的回调和一个失败的回调
  then(onFulfilled, onRejected) {
    // 根据规范，如果 then 的参数不是 function，则忽略它，让值继续往下传递，链式调用继续往下执行
    typeof onFulfilled !== 'function' ? onFulfilled = value => value : null
    typeof onRejected !== 'function' ? onRejected = error => error : null

    // then 返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      const resolveFn = value => {
        try {
          const x = onFulfilled(value)
          // 分类讨论返回值，如果是 Promise，那么等待 Promise 状态变更，否则直接 resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      const rejectFn = error => {
        try {
          const x = onRejected(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      switch (this._status) {
        case this.PENDING:
          this._resolveQueue.push(resolveFn)
          this._rejectQueue.push(rejectFn)
          break
        case this.FULFILLED:
          resolveFn(this._value)
          break
        case this.REJECTED:
          rejectFn(this._value)
          break
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(callback) {
    return this.then(value => MyPromise.resolve(callback()).then(() => value), error => {
      MyPromise.resolve(callback()).then(() => error)
    })
  }

  // 静态 resolve 方法
  static resolve(value) {
    return value instanceof MyPromise ? value : new MyPromise(resolve => resolve(value))
  }

  // 静态 reject 方法
  static reject(error) {
    return new MyPromise((resolve, reject) => reject(error))
  }

  // 静态 all 方法
  static all(promiseArr) {
    let count = 0
    let result = []
    return new MyPromise((resolve, reject) => {
      if (!promiseArr.length) {
        return resolve(result)
      }
      promiseArr.forEach((p, i) => {
        MyPromise.resolve(p).then(value => {
          count++
          result[i] = value
          if (count === promiseArr.length) {
            resolve(result)
          }
        }, error => {
          reject(error)
        })
      })
    })
  }

  // 静态race 方法
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(p => {
        MyPromise.resolve(p).then(value => {
          resolve(value)
        }, error => {
          reject(error)
        })
      })
    })
  }
}

// 测试
function fn() {
  return new MyPromise((resolve, reject) => {
    if (Math.random() > 0.5) {
      setTimeout(() => {
        resolve(`resolve ***`)
      }, 500)
    } else {
      setTimeout(() => {
        reject(`reject ***`)
      }, 500)
    }
  })
}

fn().then(res => {
  console.log('resolve value: ', res)
}).catch(err => {
  console.log('reject value: ', err)
})