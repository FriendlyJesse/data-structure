// 栈是一种遵从后进先出原则的有序集合
// 新添加或待删除的元素都保存在同一端，称为栈顶，另一端就叫栈底
// 应用场景：浏览器历史记录
// 一个基于数组的栈
class StackArray<T> {
  private items: T[]

  constructor () {
    this.items = []
  }

  push (element: T) { // 后进
    this.items.push(element)
  }

  pop () { // 先出
    return this.items.pop()
  }

  peek () {
    return this.items[this.items.length - 1]
  }

  isEmpty () {
    return this.items.length === 0
  }

  clear () {
    this.items = []
  }

  size () {
    return this.items.length
  }

}

export default StackArray