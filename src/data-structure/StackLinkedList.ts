import DoublyLinkedList from "./DoublyLinkedList.js"

class StackLinkedList<T> {
  private items: DoublyLinkedList<T>

  constructor() {
    this.items = new DoublyLinkedList<T>()
  }

  push (element: T) {
    this.items.push(element)
  }

  pop () {
    if (this.isEmpty()) return undefined
    return this.items.removeAt(this.size() - 1)
  }

  isEmpty () {
    return this.items.isEmpty()
  }

  size () {
    return this.items.size()
  }

  clear () {
    this.items.clear()
  }

  toString () {
    return this.items.toString()
  }

}

export default StackLinkedList