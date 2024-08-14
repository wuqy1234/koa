const _ = require('loadsh');


var users = [
    { 'user': 'fred', 'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred', 'age': 30 },// { 'user': 'fred',   'age': 40 },
    { 'user': 'barney', 'age': 34 }
];

_.sortBy(users, function (o) { return o.user; });
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]

const aa=_.sortBy(users, 'user', function (o) {
    return Math.floor(o.age / 10);
});
//
console.log(aa);