const _ = require('loadsh');


const a=_.some([null, 0, 'yes', false], Boolean);
// => true
console.log(a);
var users = [
    { 'user': 'barney', 'active': true },
    { 'user': 'fred', 'active': false }
];

// The `_.matches` iteratee shorthand.
const aa=_.some(users, { 'user': 'barney', 'active': false });
// => false
console.log(aa);
// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
