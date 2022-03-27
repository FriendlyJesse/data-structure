// 队列
// 队列是遵循先进先出原则(FIFO)的一组有序的项
// 应用：排队、打印
class Queue<T> {
  private count: number // 控制队列尾部的下标
  private lowestCount: number // 控制队列头部的下标
  private items: {
    [key: number]: T
  }

  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  isEmpty () {
    return this.size() === 0
  }

  size () {
    return this.count - this.lowestCount
  }

  enqueue (element: T) {
    this.items[this.count] = element
    this.count++
  }

  dequeue () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++ // 由于是对象，需要保存队列头部下标
    return result
  }

  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  clear () {

    // FIFO
    // while (!this.isEmpty()) {
    //   this.dequeue()
    // }

    this.items = {}
    this.count = this.lowestCount = 0
  }

  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }

}

export default Queue