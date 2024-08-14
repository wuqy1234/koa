const _ = require('loadsh');


// console.log(''+_.constant)

var object = { 'a': [{ 'b': { 'c': 3 } }] };

_.set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4

_.set(object, ['x', '0', 'y', 'z'], 5);
// object.x[0].y.z = 5//错误的赋值
// object.x=[{y:{z:5}}]//正确的赋值，等效于上面的set

console.log(object.x[0].y.z);
// => 5