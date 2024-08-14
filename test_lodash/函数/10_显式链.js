const _ = require('loadsh');


var users = [
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'pebbles', 'age': 1 }
];

//!显式链可以通过_.chain(value)和_(value).chain两种方法传递包装的值 
var youngest = _
    .chain(users)
    .sortBy('age')
    .map(function (o) {
        return o.user + ' is ' + o.age;
    })
    .head()
    .value();
// => 'pebbles is 1'
console.log(youngest);
