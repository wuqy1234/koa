const _ = require('loadsh');



// console.log('' + _.propertyOf)
// function propertyOf(object) {
//     return function (path) {
//         return object == null ? undefined : baseGet(object, path);
//     };
// }




var array = [0, 1, 2],
    object = { 'a': array, 'b': array, 'c': array };

_.map(['a[2]', 'c[0]'], _.propertyOf(object));
// => [2, 0]

_.map([['a', '2'], ['c', '0']], _.propertyOf(object));
// => [2, 0]




var objects = [
    { 'a': { 'b': 2 } },
    { 'a': { 'b': 1 } }
];

_.map(objects, _.property('a.b'));
// => [2, 1]

_.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
// => [1, 2]
console.log(_.map(objects, 'a.b'))//把对象的属性值转换为数组的元素

console.log(_.sortBy(objects, _.property(['a', 'b'])));//根据对象的属性值进行排序
console.log(_.sortBy(objects, 'a.b'));//和上面一样
