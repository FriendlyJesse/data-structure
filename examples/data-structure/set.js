import Set from '../../dist/data-structure/Set.js'

// const set = new Set()

// set.add(1)
// set.add(2)

// console.log(set)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.size())

// set.delete(2)

// console.log(set.values())

const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set()
setB.add(3)
setB.add(4)
setB.add(5)
setB.add(6)

const unionAB = setA.union(setB)
console.log(unionAB.values())

const intersectionAB = setA.intersection(setB)
console.log(intersectionAB.values())

const differenceAB = setA.difference(setB)
console.log(differenceAB.values())

// 子集
const setAA = new Set()
setAA.add(1)
setAA.add(2)

const setBB = new Set()
setBB.add(1)
setBB.add(2)
setBB.add(3)

const setCC = new Set()
setCC.add(2)
setCC.add(3)
setCC.add(4)

console.log(setAA.isSubsetOf(setBB))
console.log(setAA.isSubsetOf(setCC))

// 原生实现
// const setA = new Set()
// setA.add({ name: 1 })
// setA.add({ name: 2 })
// setA.add({ name: 3 })

// const setB = new Set()
// setB.add({ name: 2 })
// setB.add({ name: 3 })
// setB.add({ name: 4 })

// const union = (setA, setB) => {
//   const unionAB = new Set()
//   setA.forEach(value => unionAB.add(value))
//   setB.forEach(value => unionAB.add(value))
//   return unionAB
// }
// console.log(union(setA, setB))