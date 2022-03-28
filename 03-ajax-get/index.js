function myAjaxGet(url) {
  // 创建一个 Promise 对象
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()

    // 新建一个 http 请求
    xhr.open('GET', url, true)

    // 设置响应的数据类型
    xhr.responseType = 'json'

    // 设置请求头信息
    xhr.setRequestHeader('Accept', 'application/json')

    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return

      // 当请求成功或失败时，改变 Promise 的状态
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }

    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }

    // 发送 http 请求
    xhr.send(null)
  })
}

// 测试
myAjaxGet('https://api.github.com/users/XPoet').then(res => {
  console.log('res: ', res) //--> {...}
}).catch(err => {
  console.error('err: ', err)
})