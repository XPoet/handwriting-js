const myTypeOf = (data) => Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

// 测试
console.log(myTypeOf(1)) //--> number
console.log(myTypeOf('1')) //--> string
console.log(myTypeOf(true)) //--> boolean
console.log(myTypeOf([])) //--> array
console.log(myTypeOf({})) //--> object
console.log(myTypeOf(/^/)) //--> regexp
console.log(myTypeOf(new Date())) //--> date
console.log(myTypeOf(Math)) //--> math
console.log(myTypeOf(() => {})) //--> function