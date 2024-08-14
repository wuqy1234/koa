const _ = require('loadsh');


const aa=_([1, 2, 3])
    .tap(function (array) {
        // 改变传入的数组
        console.log(array,'ooooooooo')
        array.pop();//去除最后一个值
    })
    .reverse()//反转数组的顺序
    .value();
// => [2, 1]
console.log(aa);
