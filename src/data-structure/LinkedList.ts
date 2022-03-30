// Oh My God，node直接运行必须加上后缀
import { defaultEqualFns } from '../utils.js'
import { Node } from '../modules/linkedListModule.js'

/**
 * 链表
 * 要存储多个元素，数组可能是最常用的数据结构。每个语言都实现了数组，但是大多数数组大小是固定的(JS的不是)。
 * 链表存储有序的元素集合，但不同于数组，链表的元素在内存中并不是连续放置的。每个元素由一个存储节点本身的节点和一个指向下一个元素的引用组成
 * head -> { value, next } -> { value, next } -> { value, next } -> undefined
 * 实现：Node { element: 15, next: Node { element: 10, next: undefined } }
 * 相较于传统的数组，链表的一个好处在于添加或移动元素的时候不需要移动其他元素。在数组中我们可以直接访问任何位置的元素，
 * 而要想访问链表中间的一个元素需要从头开始迭代链表知道找到所需的元素
 * 应用：寻宝游戏，火车车厢
 */
class LinkedList<T> {
  protected count = 0
  protected head: Node<T> | undefined

  constructor (protected equalsFn = defaultEqualFns) {}

  /**
   * 尾部添加元素
   * @param element 元素
   */
  push (element: T) {
    const node = new Node(element)
    let current
    if (this.head == null) { // 链表为空，添加第一个元素(this.head == null 与 (this.head == undefined || this.head == null) 等价)
      this.head = node
    } else { // 链表不为空，向其追加元素
      current = this.head
      while (current.next != null) { // 获得最后一项
        current = current.next
      }
      // 将其next赋为新元素，建立链接
      current.next = node
    }
    this.count++
  }

  /**
   * 获取目标元素
   * @param index 索引
   * @returns 目标元素
   */
  getElementAt (index: number) {
    if (!(index >= 0 && index <= this.count)) return undefined
    
    let node = this.head
    for (let i = 0; i < index && node != null; i++) {
      node = node.next
    }
    return node
  }

  /**
   * 移除指定下标
   * @param index 索引
   * @returns 成功返回删除的元素，否则返回undefined
   */
  removeAt (index: number) {
    // 检查越界值
    if (!(index >= 0 && index < this.count)) return undefined

    let current = this.head
    if (index === 0) { // 如果是第一项，直接用子项覆盖
      this.head = current.next
    } else {
      // 找出前一项与当前项
      const previous = this.getElementAt(index - 1)
      current = previous.next
      // 将下一项与前一项链接起来，跳过当前项(current.element)
      previous.next = current.next
    }
    this.count--
    return current.element
  }

  /**
   * 插入元素
   * @param element
   * @param index 
   * @returns 
   */
  insert (element: T, index: number) {
    if (!(index >= 0 && index <= this.count)) return false
    
    const node = new Node(element)
    if (index === 0) {
      const current = this.head
      node.next = current
      this.head = node
    } else {
      const previous = this.getElementAt(index - 1)
      const current = previous.next
      node.next = current
      previous.next = node
    }
    this.count++
    return true
  }

  /**
   * 返回元素的位置
   * @param element 
   * @returns 
   */
  indexOf (element: T) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  /**
   * 删除对应的元素
   * @param element 
   * @returns 
   */
  remove (element: T) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  size () {
    return this.count
  }

  isEmpty () {
    return this.size() === 0
  }

  getHead () {
    return this.head
  }

  clear() {
    this.head = undefined
    this.count = 0
  }

  toString () {
    if (this.head == null) return ''

    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString}, ${current.element}`
      current = current.next
    }
    return objString
  }
 
}

export default LinkedList