import { defaultToString } from '../utils.js'
import ValuePair from '../modules/ValuePair.js'
import LinkedList from './LinkedList.js'

/**
 * 散列表
 * 通过把关键码值映射到表中的一个位置来访问记录，以加快查找速度
 * 散列算法的作用是尽可能快的在数据结构中找到一个值
 */
class HashTable<K, V> {
  protected table: { [key: string]: ValuePair<K, V> } | { [key: string]: LinkedList<ValuePair<K, V>> } = {}

  constructor (protected toStrFn = defaultToString) {}

  /**
   * 散列函数
   * 遍历key并将从 ASCII 表中查到的每个字符对应的ASCII值加到 hash 变量中
   * 为了得到比较小的数值，我们会使用 hash 值和一个任意数做除法的余数(可以规避操作数超过数字变量最大表示范围的风险)
   * @param key 
   * @returns 
   */
  loseloseHashCode (key: K) {
    if (typeof key === 'number') return key
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i) // 返回一个字符的代码
    }
    return hash % 37
  }

  // 更好的散列函数
  // djb2HashCode (key: K) {
  //   const tableKey = this.toStrFn(key)
  //   let hash = 5381
  //   for (let i = 0; i < tableKey.length; i++) {
  //     hash = (hash * 33) + tableKey.charCodeAt(i)
  //   }
  //   return hash % 1031
  // }

  hasCode (key: K) {
    return this.loseloseHashCode(key)
    // return this.djb2HashCode(key)
  }

  put (key: K, value: V) {
    if (!(key != null && value != null)) return false
    const position = this.hasCode(key)
    this.table[position] = new ValuePair(key, value)
    return true
  }

  get (key: K) {
    const ValuePair = this.table[this.hasCode(key)]
    return ValuePair == null ? undefined : (ValuePair as any).value
  }

  remove (key: K) {
    const hash = this.hasCode(key)
    const ValuePair = this.table[hash]
    if (ValuePair != null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }

}

export default HashTable