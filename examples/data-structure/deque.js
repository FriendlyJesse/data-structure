import Deque from '../../dist/data-structure/Deque.js'

const deque = new Deque()
console.log(deque.isEmpty())
deque.addBack('John')
deque.addBack('Jack')
console.log(deque.toString())
deque.addBack('Camila')
console.log(deque.toString())
console.log(deque.size())
console.log(deque.isEmpty())
deque.removeFront() // 移除John
console.log(deque.toString())
deque.removeBack() // Camila决定离开
console.log(deque.toString())
deque.addFront('John') // John回来询问一些信息
console.log(deque.toString())