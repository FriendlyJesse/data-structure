import LinkedList from './LinkedList.js'
import { defaultEqualFns } from '../utils.js'
import { Node } from '../modules/LinkedListModule.js'

/**
 * 循环链表
 * 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用
 * 循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针指向第一个元素
 * head -> { value, next } -> { value, next } -> head
 */
class CircularLinkedList<T> extends LinkedList<T> {
  constructor (protected equalsFn = defaultEqualFns) {
    super(equalsFn)
  }

  push(element: T) {
    const node = new Node(element)
    let current

    if (this.head == null) {
      this.head = node
    } else {
      current = this.getElementAt(this.size() - 1)
      current.next = node
    }

    // set node.next to head - to have circular list
    node.next = this.head

    this.count++;
  }

  insert(element: T, index: number): boolean {
    if (!(index >= 0 && index <= this.count)) return false

    const node = new Node(element)
    let current = this.head
    if (index === 0) { // 插入头部
      if (this.head == null) { // 链表为空
        this.head = node
        node.next = this.head
      } else { // 链表不为空
        node.next = current
        current = this.getElementAt(this.size())
        // 更新最后一个元素
        this.head = node
        current.next = this.head
      }
    } else {
      const previous = this.getElementAt(index - 1)
      node.next = previous.next
      previous.next = node
    }
    this.count++
    return true
  }

  removeAt(index: number): T {
    if (!(index >= 0 && index < this.count)) return undefined
    let current = this.head
    if (index === 0) {
      if (this.size() === 1) {
        this.head = undefined
      } else {
        const removed = this.head
        current = this.getElementAt(this.size() - 1)
        this.head = this.head.next
        current.next = this.head
        current = removed
      }
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }

}

export default CircularLinkedList