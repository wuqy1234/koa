const _ = require('loadsh');
var users = [
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true }
];

const aa = _.dropWhile(users, function (o) { return !o.active; });
console.log(aa)// =>[ { user: 'pebbles', active: true } ]

const bb = _.dropWhile(users, { 'user': 'barney', 'active': false });
console.log(bb)// =>[ { user: 'fred', active: false }, { user: 'pebbles', active: true } ]


const cc = _.dropWhile(users, ['active', false]);
console.log(cc);// => [ { user: 'pebbles', active: true } ]


const dd=_.dropWhile(users, 'active');
console.log(dd)
// => objects for ['barney', 'fred', 'pebbles']
