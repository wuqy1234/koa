const _ = require('loadsh');


//* _.method(path, [args])
//* path(Array | string): 调用函数所在对象的路径。
//* [args](...*): 传递给调用函数的参数。

var objects = [
    { 'a': { 'b': _.constant(2) } },
    { 'a': { 'b': _.constant(1) } },
    { 'a': { b(e){return e} } }
];

console.log(_.map(objects, _.method('a.b',1234)))
// => [2, 1]

_.map(objects, _.method(['a', 'b']));
// => [2, 1]
function test(e){
    return e
}
console.log(_.method(test,123));//!只能调用对象中的方法