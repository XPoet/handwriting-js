/**
 * 手写 EventBus
 */

class EventBus {
  constructor() {
    // 存储事件及其对应的回调函数
    this.events = {}
  }

  // 订阅事件
  subscribe(eventName, callback) {
    // 如果事件不存在，则创建一个新的事件数组
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    // 将回调函数添加到事件数组中
    this.events[eventName].push(callback)
  }

  // 取消订阅事件
  unsubscribe(eventName, callback) {
    // 如果事件不存在，则直接返回
    if (!this.events[eventName]) {
      return
    }
    // 从事件数组中移除指定的回调函数
    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
  }

  // 发布事件
  next(eventName, data) {
    // 如果事件不存在，则直接返回
    if (!this.events[eventName]) {
      return
    }
    // 遍历事件数组，依次执行回调函数
    this.events[eventName].forEach(callback => {
      callback(data)
    })
  }
}

// 创建一个新的 EventBus 实例
const eventBus = new EventBus()

// 定义事件处理函数
const handler1 = data => {
  console.log('Handler 1:', data)
}

const handler2 = data => {
  console.log('Handler 2:', data)
}

// 订阅事件
eventBus.subscribe('event1', handler1)
eventBus.subscribe('event1', handler2)

// 发布事件
eventBus.next('event1', 'Hello, EventBus!')

// 取消订阅事件
eventBus.unsubscribe('event1', handler2)