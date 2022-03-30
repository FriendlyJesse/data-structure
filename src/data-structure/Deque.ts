// 双端队列
// 双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列
// 应用：电影院，一个刚买票的人想问些简单信息可以直接回到头部，在队伍末尾的人如果赶时间，他可以直接离开队伍
class Deque<T> {
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

  clear () {
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

  addFront (element: T) {
    if (this.isEmpty()) { // 如果这个双端队列是空的，那么将它添加到双端队列的后端
      this.addBack(element)
    } else if (this.lowestCount > 0) { // 如果有元素被从前端移除过，那么将下标减 1 并赋值
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else { // 如果没有从前端移除: lowestCount === 0
      // 将所有元素后移一位
      // 0: 0, 1: 1, 2: 2
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      // 1: 0, 2: 1, 3: 2
      this.count++
      this.lowestCount = 0
      // 从前端覆盖 0 的坐标
      this.items[0] = element
    }
  }

  addBack (element: T) {
    this.items[this.count] = element
    this.count++
  }

  removeFront () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++ // 由于是对象，需要保存队列头部下标
    return result
  }

  removeBack () {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peekFront () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  
  peekBack () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

}

export default Deque