import { defaultToString } from '../utils.js'
import ValuePair from '../modules/ValuePair.js'
import LinkedList from './LinkedList.js'
import HashTable from './HashTable.js'

/**
 * 分离链接
 * 分离链接法包括为散列表每一个位置创建一个链表并将元素存储在里面
 * 它是解决散列表冲突的最简单的方法
 */
class HashTableSeparateChaining<K, V> extends HashTable<K, V> {
  protected table: { [key: string]: LinkedList<ValuePair<K, V>> } = {}

  constructor (protected toStrFn = defaultToString) {
    super(toStrFn)
  }

  put (key: K, value: V): boolean {
    if (!(key != null && value != null)) return

    const position = super.hasCode(key)
    if (this.table[position] == null) {
      this.table[position] = new LinkedList()
    }
    this.table[position].push(new ValuePair(key, value))
    return true
  }

  get(key: K): V {
    const position = this.hasCode(key)
    const LinkedList = this.table[position]
    if (LinkedList != null && !LinkedList.isEmpty()) {
      let current = LinkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }

  remove(key: K): boolean {
    const position = this.hasCode(key)
    const LinkedList = this.table[position]
    if (LinkedList != null && !LinkedList.isEmpty()) {
      let current = LinkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          LinkedList.remove(current.element)
          if (LinkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }
}

export default HashTableSeparateChaining