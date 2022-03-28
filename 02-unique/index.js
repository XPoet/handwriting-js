const myUnique = array => [...new Set(array)]

// 测试
console.log(myUnique([1, 1, 2, 3])) //--> [1, 2, 3]
console.log(myUnique(['A','A','A', 'B', 'D', 'Q'])) //--> ['A', 'B', 'D', 'Q']