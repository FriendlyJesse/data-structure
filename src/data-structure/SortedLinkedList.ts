import LinkedList from './LinkedList.js'
import { defaultEqualFns, Comparse, defaultComparse } from '../utils.js'

/**
 * 有序链表
 * 就是只能按照顺序插入的链表
 */
class SortedLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn = defaultEqualFns, protected compareFn = defaultComparse) {
    super(equalsFn)
  }

  insert(element: T, index: number): boolean {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }

  getIndexNextSortedElement (element: T): number {
    let current = this.head
    let i = 0
    for (; i< this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Comparse.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return i
  }

}

export default SortedLinkedList