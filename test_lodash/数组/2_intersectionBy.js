const _ = require('loadsh');
const aa = _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
console.log(aa, Math.trunc(2.4), Math.random());
// => [2.1]

// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
