import Deque from '../../dist/data-structure/Deque.js'

// const deque = new Deque()
// console.log(deque.isEmpty())
// deque.addBack('John')
// deque.addBack('Jack')
// console.log(deque.toString())
// deque.addBack('Camila')
// console.log(deque.toString())
// console.log(deque.size())
// console.log(deque.isEmpty())
// deque.removeFront() // 移除John
// console.log(deque.toString())
// deque.removeBack() // Camila决定离开
// console.log(deque.toString())
// deque.addFront('John') // John回来询问一些信息
// console.log(deque.toString())


// 回文检查器
// 会问是正反都能读通的单词、词组、数或一系列字符的序列，如：madam或racecar

function palindromeChecker (aString) {
  if (aString === undefined || aString === null ||
    (aString !== null && aString.length === 0)) {
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i))
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }
  console.log(deque)
  return isEqual
}

console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('kayak', palindromeChecker('kayak'))
console.log('level', palindromeChecker('level'))
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'))
console.log('Step on no pets', palindromeChecker('Step on no pets'))