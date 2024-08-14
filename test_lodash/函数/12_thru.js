const _ = require('loadsh');

// *_.trim([string = ''], [chars = whitespace])
// 从string字符串中移除前面和后面的 空格 或 指定的字符。
_.trim('  abc  ');
// => 'abc'

const bb = _.trim('-_!-abc-_-*', '*!_-');
// => 'abc'
// console.log(bb);

_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar']


const aa = _('  abc  ')
    .chain()
    .trim()// 移除字符串两端的空格
    .thru(function (value) {
        return [value];
    })
    .value();
// => ['abc']

console.log(
    _('  abc  ').chain().trim().thru(function (value) {
        return [value];
    }), '\n',
    _('  abc  '));




const result = _.chain([1, 2, 3])// [1, 2, 3]该数组作为value，在链条中传递。
    .map(x => x * 2)
    //_.tap(value, interceptor)中，第二个参数为一个函数,该函数的参数是value，
    //此函数的返回值不会改变value的值。
    //但是此函数中如果调用了其他方法是能够改变value的值。比如arr.push(12),arr.pop()等等数组的方法。
    //如果是对象则有对象的方法
    .tap(arr => {
        console.log(arr.filter(x => x > 3))
        arr.push(12);//value的值改变
        return arr.filter(x => x > 3)//这里的return值不会改变value的值。tap也不需要return。
    })
    .reverse()
    //_.thru(value, interceptor)中的interceptor作为一个函数，参数为value，
    //此函数的返回值会改变value的值，如果不return，那么value为空。
    //此函数中如果调用了其他方法是能够改变value的值。比如arr.push(12),arr.pop()等等数组的方法。
    //如果是对象则有对象的方法。
    .thru(arr => {
        arr.push(16);//value的值改变
        return arr.filter(x => x > 3)//value的值改变，必须return，否则会丢失value
    })
    .value(); // 结果是 [ 12, 6, 4, 16 ]

console.log(result);