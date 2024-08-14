const _ = require('loadsh');
var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false }
];

const aa=_.filter(users, function (o) { return !o.active; });
// => objects for ['fred']
console.log(aa);
// The `_.matches` iteratee shorthand.
const bb=_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
console.log(bb);
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
const cc=_.filter(users, 'active');
// => objects for ['barney']
console.log(cc);