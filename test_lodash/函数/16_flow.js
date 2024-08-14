const _ = require('loadsh');



function square(n) {
    // console.log(n)
    return n * n;
}

var addSquare = _.flow([_.add, square]);
addSquare(1, 2);
// => 9

// 每一个连续调用，传入的参数都是前一个函数返回的结果。
var aa = _.flow([ 
    (e) => {
        console.log(e)
        return 2
    },
    (e) => {
        console.log(e)
        return 3
    },
    (e) => {
        console.log(e)
        return 4
    }
]);
console.log(aa(1));