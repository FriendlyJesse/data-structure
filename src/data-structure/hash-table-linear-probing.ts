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
      // 必须存在验证，否则下次寻找的就是一个空值就永远丢失了值
      this.verifyRemoveSideEffect(key, position)
      return true
    }
    let index = position + 1
    while (this.table[index] != null && this.table[index].key !== key) {
      index++
    }
    if (this.table[index] != null && this.table[index].key === key) {
      delete this.table[index]
      // 必须存在验证，否则下次寻找的就是一个空值就永远丢失了值
      this.verifyRemoveSideEffect(key, index)
      return true
    }
  }

  /**
   * 验证删除操作是否有副作用
   * @param key 被删除的key
   * @param removedPosition 被删除key的位置
   */
  verifyRemoveSideEffect (key: K, removedPosition: number) {
    const hash = this.hasCode(key)
    let index = removedPosition + 1
    // 迭代查找是否有需要往上移动的的元素
    while (this.table[index] != null) {
      const posHash = this.hasCode(this.table[index].key)
      // 如果当前元素 hash 值小于或等于元素值 || 当前元素的 hash 或等于 上一个被移除 key 的 hash 值
      // 那么将当前元素移动至被被删除至的位置，而后覆盖当前值
      if (posHash <= hash || posHash <= removedPosition) {
        // 依次向上移动
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }

}

export default HashTableLinearProbing