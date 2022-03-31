import { DoublyNode } from '../modules/LinkedListModule.js'
import { defaultEqualFns } from '../utils.js'
import LinkedList from './LinkedList.js'

/**
 * 双向链表
 * 双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素
 * head <-> { prev, value, next } <-> { prev, value, next } <-> { prev, value, next }
 * 这里在单项链表的基础上扩展
 */
class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | undefined
  protected tail: DoublyNode<T> | undefined

  constructor (protected equalsFn = defaultEqualFns) {
    super(equalsFn)
  }

  /**
   * 从任意位置插入元素
   * @param element 
   * @param index 
   * @returns 
   */
  insert(element: T, index: number): boolean {
    if (!(index >= 0 && index <= this.count)) return false

    const node = new DoublyNode(element)
    let current = this.head
    if (index === 0) { // 插入头部时
      if (this.head == null) { // 链表为空，把head和tail都指向这个新节点
        this.head = node
        this.tail = node
      } else { // 不为空，current变量将时对双向链表中第一个元素的引用(this.head === this.tail)
        /**
         * 两步构成闭环，锁上
         * 1:
         * b.next = a
         * a.prev = b
         * 2:
         * c.next = b
         * b.prev = a
         * result:
         * a.prev = b, b.prev = c
         * c.next = b, b.next = a
         */
        // 新节点的.next = 原始节点
        node.next = this.head
        // 原始节点的.prev = 新节点
        current.prev = node
        // 因为是插入头部，将 head 覆盖
        this.head = node
      }
    } else if (index === this.count) { // 插入尾部时，不是上面的说明起码有两项
      current = this.tail
      // 将新节点指向当前的next
      current.next = node
      // 将新节点的前一个节点指向当前节点
      node.prev = current
      // 因为是插入尾部，将 tail 覆盖
      this.tail = node
    } else { // 插入中间项
      const previous = this.getElementAt(index - 1)
      current = previous.next
      // 新节点的next接上当前项
      node.next = current
      // 前一个节点的next接上新节点
      previous.next = node
      // 当前项的前一项接上新节点
      current.prev = node
      // 新节点的前一项接上前一个节点
      node.prev = previous
    }
    this.count++
    return false
  }

  /**
   * 删除指定项
   * @param index 
   * @returns 
   */
  removeAt(index: number): T {
    if (!(index >= 0 && index <= this.count)) return undefined
    let current = this.head
    if (index === 0) { // 删除头项
      this.head = current.next
      if (this.count === 1) {
        this.tail = undefined
      } else {
        this.head.prev = undefined
      }
    } else if (index === this.count - 1) { // 删除尾项
      current = this.tail
      this.tail = current.prev
      this.tail.next = undefined
    } else { // 中间项
      current = this.getElementAt(index)
      const previous = current.prev
      // 跳过current
      previous.next = current.next
      // prev 链接上
      current.next.prev = previous
    }
    this.count--
    return current.element
  }

  getTail() {
    return this.tail
  }

  clear() {
    super.clear()
    this.tail = undefined
  }

  inverseToString() {
    if (this.tail == null) {
      return ''
    }
    let objString = `${this.tail.element}`
    let previous = this.tail.prev
    while (previous != null) {
      objString = `${objString},${previous.element}`
      previous = previous.prev
    }
    return objString
  }

}

export default DoublyLinkedList