import { defaultToString } from '../utils.js'
import ValuePair from '../modules/ValuePair.js'
import HashTable from './HashTable.js'

/**
 * 线性探查
 * 当向某个位置添加一个新元素的时候，如果索引被占据则往下寻找，知道找到一个空的位置
 */
class HashTableLinearProbing<K, V> extends HashTable<K, V> {
  protected table: { [key: string]: ValuePair<K, V> }

  constructor (protected toStrFn = defaultToString) {
    super(toStrFn)
  }

  put (key: K, value: V): boolean {
    if (!(key != null && value != null)) return false
    const position = this.hasCode(key)
    if (this.table[position] == null) { // 有空闲位置则占据
      this.table[position] = new ValuePair(key, value)
    } else { // 否则往下寻找
      let index = position + 1
      while (this.table[index] != null) {
        index++
      }
      this.table[index] = new ValuePair(key, value)
    }
    return true
  }

  get (key: K) {
    const position = this.hasCode(key)
    if (this.table[position] == null) return undefined
    if (this.table[position].key === key) { // 存在原始位置
      return this.table[position].value
    }
    // 不存在原始位置，则迭代找相应的值
    let index = position + 1
    while (this.table[index] != null && this.table[index].key !== key) {
      index++
    }
    if (this.table[index] != null && this.table[index].key === key) {
      return this.table[position].value
    }
  }

  remove (key: K): boolean {
    const position = this.hasCode(key)
    if (this.table[position] == null) return undefined 
    if (this.table[position].key === key) {
      delete this.table[position]
      this.verifyRemoveSideEffect(key, position)
      return true
    }
    let index = position + 1
    while (this.table[index] != null && this.table[index].key !== key) {
      index++
    }
    if (this.table[index] != null && this.table[index].key === key) {
      delete this.table[index]
      this.verifyRemoveSideEffect(key, index)
      return true
    }
  }

  verifyRemoveSideEffect (key: K, removedPosition: number) {
    const hash = this.hasCode(key)
    let index = removedPosition + 1
    while (this.table[index] != null) {
      const posHash = this.hasCode(this.table[index].key)
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }

}

export default HashTableLinearProbing