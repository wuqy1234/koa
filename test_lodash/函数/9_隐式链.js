const _ = require('loadsh');




//sum为初始值，即0;其中的箭头函数会被调用9次
const aa = _.reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (sum, n) => {
    // console.log(sum, n, 'iiiiiiiiiiiiii');
    return sum + n;
}, 0);

// console.log(aa);
_.add(6, 4);
// => 10


function square(n) {
    return n * n;
}

//! 隐式链只能在后面使用一次loadsh的方法
var wrapped = _([1, 2, 3]);


// 隐式的把[1, 2, 3]流传给reduce方法，reduce中再调用add方法
wrapped.reduce(_.add);
// => 6

//其中的add函数被调用了3次，reduce会把两个参数传给add方法，第一个是累计值，第二个是数组中的元素


// 返回链式包装的值
var squares = wrapped.map(square);

console.log(
    squares.__wrapped__.__wrapped__.__wrapped__, '\n\r',
    typeof wrapped, '\n\r',
    squares.value(), '\n\r',
    wrapped, '\n\r',
    wrapped.head(), '\n\r',//这里无法实现流式编程了，包装的值夜没有传递下去
    wrapped.chain().head().head(), '\n\r',//现在这里可以实现流式编程了，在链条上可以一直使用loadsh中的方法了

);

_.isArray(squares);
// => false
//使用value方法能够把包装的值给return出来
_.isArray(squares.value());
// => true
