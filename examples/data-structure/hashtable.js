import HashTable from '../../dist/data-structure/HashTable.js'

const hash = new HashTable()
// hash.put('Gandalf', 'test111')
// hash.put('John', 'test222')
// hash.put('Tyrion', 'test333')

// console.log(hash.hasCode('Gandalf') + '-- Gandalf')
// console.log(hash.hasCode('John') + '-- John')
// console.log(hash.hasCode('Tyrion') + '-- Tyrion')
// hash.remove('Gandalf')
// console.log(hash.get('Gandalf'))

hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');
// console.log(hash.hasCode('Ygritte'))
// console.log(hash.hasCode('Jonathan'))
// console.log(hash.hasCode('Jamie'))
// console.log(hash.hasCode('Jack'))
// console.log(hash.hasCode('Nathan'))
// console.log(hash.hasCode('Athelstan'))
// console.log(hash.hasCode('Sue'))
// console.log(hash.hasCode('Aethelwulf'))
// console.log(hash.hasCode('Sargeras'))
console.log(hash.toString())