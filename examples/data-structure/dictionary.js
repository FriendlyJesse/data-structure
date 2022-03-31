import Dictionary from '../../dist/data-structure/Dictionary.js'

const dictionary = new Dictionary()

dictionary.set('Gandalf', 'test1111')
dictionary.set('John', 'test2222')
dictionary.set('Tyrion', 'test3333')
console.log(dictionary.hasKey('Gandalf'))
console.log(dictionary.size())
console.log(dictionary.keys())
console.log(dictionary.values())
console.log(dictionary.get('Tyrion'))

dictionary.remove('John')

console.log(dictionary.keys())
console.log(dictionary.values())
console.log(dictionary.keyValues())

dictionary.forEach((k, v) => {
  console.log('forEach', `key: ${k}, value: ${v}`)
})