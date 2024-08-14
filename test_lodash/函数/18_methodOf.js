const _ = require('loadsh');



//* _.methodOf(object, [args])
//*先传对象和参数进去，后面再传路径，和method方法是相反的，同时还多了一步，即把对象传入。
//!methodOf方法是一个闭包函数，比method方法多套了一层包装器函数(闭包)。
console.log('' + _.methodOf)
// function(object, args) {
//     return function (path) {
//         return baseInvoke(object, path, args);
//     };
// }




var array = _.times(3, _.constant),
    object = { 'a': array, 'b': array, 'c': array };

console.log(_.map(array, (e) => { return e(); }))

console.log(_.methodOf(object)('a[2]'))

console.log(_.methodOf(object)(['a', '2']))

_.map(['a[2]', 'c[0]'], _.methodOf(object));
// => [2, 0]

_.map([['a', '2'], ['c', '0']], _.methodOf(object));
// => [2, 0]

