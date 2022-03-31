/**
 * 集合
 * 集合由一组无序且唯一的项组成
 * 这里我们用对象实现，因为对象能够保证集合内的元素都是唯一的，当然也可以使用数组
 */
class Set<T> {

  items: any

  constructor () {
    this.items = {}
  }

  has (element: T) {
    // return element in this.items
    // 该方法返回一个对象是否有特定属性的布尔值，而 in 运算符则返回对象再原型链上是否有特定属性的布尔值
    // 我们也可以直接使用 hasOwnProperty 方法，但是这样 eslint 会报错
    // 因为继承了 Object.property的对象上的hasOwnProperty也有可能会被覆盖，以下是更安全的做法
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  add (element: T) {
    if (this.has(element)) return false
    this.items[element] = element
    return true
  }

  delete (element: T) {
    if (!this.has(element)) return false
    delete this.items[element]
    return true
  }

  clear () {
    this.items = {}
  }

  size () {
    return Object.keys(this.items).length
  }

  values () {
    return Object.values(this.items)
  }

  /**
   * 并集
   * 意思是：X(元素)存在 A 中，或 X 存在 B 中
   * @param otherSet 另一个集合
   * 此函数为纯函数，纯函数不会修改当前的实例或参数，只会生成一个新的结果
   */
  union (otherSet: Set<T>) {
    const unionSet = new Set()
    this.values().forEach(value => unionSet.add(value))
    otherSet.values().forEach(values => unionSet.add(values))
    return unionSet
  }

  /**
   * 交集
   * 意思是：X(元素)存在 A 中，且存在 B 中
   * @param otherSet 另一个集合
   * @returns 
   */
  intersection (otherSet: Set<T>) {
    // const intersectionSet = new Set()
    // const values = this.values()
    // values.forEach((value: any) => {
    //   if (otherSet.has(value)) {
    //     intersectionSet.add(value)
    //   }
    // })

    // return intersectionSet
    
    // 我们对以上代码做个优化，使迭代元素的次数更少
    const intersectionSet = new Set()
    const values = this.values()
    const otherValues = otherSet.values()
    // 区分二者大小
    let biggerSet = values
    let smallerSet = otherValues
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues
      smallerSet = values
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value)
      }
    })
    return intersectionSet
  }

  /**
   * 差集
   * 意思是：X(元素)存在 A 中，且 X 不存在 B 中
   * @param otherSet 另一个集合
   * @returns 
   */
  difference (otherSet: Set<T>) {
    const differenceSet = new Set()
    this.values().forEach((value: any) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  /**
   * 子集
   * 意思是：集合A中的每一个元素也需要存在集合B中
   * @param otherSet 另一个集合
   * @returns
   */
  isSubsetOf (otherSet: Set<T>) {
    // 首先如果当前实例中的元素比 otherSet 更多，它就不是一个子集
    if (this.size() > otherSet.size()) return false
    let isSubset = true
    this.values().every((value: any) => {
      if (otherSet.has(value)) return true
      isSubset = false
      return false
    })
    return isSubset
  }

}

export default Set