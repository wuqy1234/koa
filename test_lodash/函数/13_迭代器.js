const _ = require('loadsh');


var wrapped = _([1, 2]);

wrapped[Symbol.iterator]() === wrapped;
// => true

Array.from(wrapped);//没有调用value方法还是无法转换的
// => [1, 2]，实际上为空数组。

console.log(
    wrapped[Symbol.iterator](), '\r\n',
    wrapped, '\r\n',
    wrapped[Symbol.iterator]() === wrapped, '\r\n',
    Array.from(wrapped[Symbol.iterator]().value()), '\r\n',
    Array.from(wrapped.value()), '\r\n',
)


