import LinkedList from '../../dist/data-structure/LinkedList.js'

const list = new LinkedList()

list.push(15)
list.push(10)
list.push(9)
list.removeAt(1)
console.log(list.indexOf(10))
console.log(list.toString())