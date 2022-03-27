import Queue from '../../dist/data-structure/Queue.js'

const queue = new Queue()
console.log(queue.isEmpty())
// queue.enqueue(5)
// queue.enqueue(8)
// // console.log(stack)
// // console.log(stack.count)
// queue.dequeue()
// console.log(queue.size())
// console.log(queue)
// // queue.clear()
// console.log(queue.toString())

// 击鼓传花
function hotPotato (elementsList, num) {
  const queue = new Queue()
  const elimitatedList = []
  // 入队
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }

  while (queue.size() > 1) {
    // 击鼓，根据传进来的值进行数轮
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    // 排除接花的人
    elimitatedList.push(queue.dequeue())
  }

  return {
    eliminated: elimitatedList,
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const result = hotPotato(names, 7)
result.eliminated.forEach(name => {
  console.log(`${name}在击鼓传花游戏中被淘汰`)
})
console.log(`胜利者：${result.winner}`)