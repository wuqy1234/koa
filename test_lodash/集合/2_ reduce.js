const _ = require('loadsh');


const aa = _.reduce([1, 2], function (sum, n) {
    return sum + n;
}, 0);
// => 3
// console.log(aa);

const bb = _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function (result, value, key) {
    //判断result[value]是否有值，没有则返回空数组，然后给空数组中添加key
    (result[value] || (result[value] = [])).push(key);

    return result;
}, {});//初始的result为空对象，此行的{}即为初始值。
// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
// console.log(bb);

var array = [[0, 1], [2, 3], [4, 5]];

const cc=_.reduceRight(array, function (flattened, other) {
    return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
console.log(cc);

const dd = _.reduce(array, function (flattened, other) {
    return flattened.concat(other);
}, []);
console.log(dd);