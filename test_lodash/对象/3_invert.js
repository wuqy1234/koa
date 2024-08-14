const _ = require('loadsh');


var object = { 'a': 1, 'b': 2, 'c': 1 };

console.log(_.invert(object))//a被覆盖了
// => { '1': 'c', '2': 'b' }
var object = { 'a': 1, 'b': 2, 'c': 1 };

console.log(_.invertBy(object))
// => { '1': ['a', 'c'], '2': ['b'] }

console.log(_.invertBy(object, function (value) {
    return 'group' + value;
}))
// => { 'group1': ['a', 'c'], 'group2': ['b'] }

var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };

console.log(_.invoke(object, 'a[0].b.c.slice', 1, 3));
// => [2, 3]
console.log(object.a[0].b.c.slice(1, 3))