import CircularLinkedList from '../../dist/data-structure/CircularLinkedList.js'

const list = new CircularLinkedList()

list.push(15)
list.push(9)
list.insert(1, 2)
console.log(list.removeAt(0))
console.log(list)