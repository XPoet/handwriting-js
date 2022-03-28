/**
 * 深拷贝
 * @param data
 */
function deepCopy(data) {
  // 只拷贝对象类型的数据
  if (!data || typeof data !== 'object') return

  // object 如果是数组类型就新建一个空数组，否则新建空对象
  const newObject = Array.isArray(data) ? [] : {}

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // data[key] 如果是对象类型，则使用递归继续遍历拷贝属性
      newObject[key] = typeof data[key] === 'object' ? deepCopy(data[key]) : data[key]
    }
  }

  return newObject
}

// 测试
console.log('深拷贝测试 ----------------------------')
const _obj1 = { x: 1, y: { z: 3 } }
const _obj2 = deepCopy(_obj1)
console.log(_obj2) //--> { x: 1, y: { z: 3 } }

const _arr1 = [1, [2, 3]]
const _arr2 = deepCopy(_arr1)
console.log(_arr2) //--> [1, [2, 3]]
console.log('-------------------------------------')