/**
 * 浅拷贝
 * @param data
 */
function shallowCopy(data) {
  // 只拷贝对象类型的数据
  if (!data || typeof data !== 'object') return

  // data 如果是数组类型就新建一个空数组，否则新建空对象
  const newObject = Array.isArray(data) ? [] : {}

  // 遍历 data，进行属性拷贝
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newObject[key] = data[key]
    }
  }

  return newObject
}

// 测试
console.log('浅拷贝测试 ----------------------------')
const obj1 = { x: 1, y: 2, z: 3 }
const obj2 = shallowCopy(obj1)
console.log(obj2) //--> { x: 1, y: 2, z: 3 }

const arr1 = [1, 2, 3]
const arr2 = shallowCopy(arr1)
console.log(arr2) //--> [1, 2, 3]
console.log('-------------------------------------')
