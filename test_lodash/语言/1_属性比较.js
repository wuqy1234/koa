const _ = require('loadsh');


var object = { 'a': 1, 'b': 2 };
//不要是使用赋值单等号，要使用比较的双等号，否则会一直返回true，如果返回的是n，也会输出true。
const aa=_.conformsTo(object, { 'a': function (n) { return n == 1; } });
// => true
console.log(aa);

_.conformsTo(object, { 'b': function (n) { return n > 2; } });
// => false
