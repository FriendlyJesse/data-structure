import ValuePair from '../modules/ValuePair.js'
import { defaultToString } from '../utils.js'

class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> } = {}
  constructor(protected toStrFn = defaultToString) {}

  hasKey (key: K) {
    return this.table[this.toStrFn(key)] != null
  }

  set (key: K, value: V) {
    if (!(key != null && value != null)) return false
    const tableKey = this.toStrFn(key)
    this.table[tableKey] = new ValuePair(key, value)
    return true
  }

  remove (key: K) {
    if (!this.hasKey(key)) return
    delete this.table[this.toStrFn(key)]
    return true
  }

  get (key: K) {
    if (!this.hasKey(key)) return undefined
    return this.table[this.toStrFn(key)]
  }

  keyValues () {
    return Object.values(this.table)
  }

  keys () {
    return this.keyValues().map((value: any) => value.key)
  }

  values () {
    return this.keyValues().map(value => value.value)
  }

  forEach (callbackFn: (key: K, value: V) => any) {
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if (result === false) break
    }
  }

  size () {
    return Object.keys(this.table).length
  }

  isEmpty () {
    return this.size() === 0
  }

  clear () {
    this.table = {}
  }

  toString () {
    if (this.isEmpty()) return ''
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    valuePairs.forEach((value, key) => {
      objString = `${objString}, ${value.toString()}`
    })
    return objString
  }

}

export default Dictionary