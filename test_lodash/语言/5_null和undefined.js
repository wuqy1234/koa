const _ = require('loadsh');





_.isNil(null);
// => true
//void是一个一元运算符，它后面跟着一个表达式，这个表达式的值会被计算，
//但是void运算符会强制使整个表达式的结果为undefined。
_.isNil(void 0);
// => true

_.isNil(NaN);
// => false


