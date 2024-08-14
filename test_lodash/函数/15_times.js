const _ = require('loadsh');



_.times(3, String);
// => ['0', '1', '2']

_.times(4, _.constant(0));
// => [0, 0, 0, 0]


//!等效于下面的函数



console.log(_.times(3, (e) => {
    console.log(e)
    return String(e)
}))
// => ['0', '1', '2']

console.log(_.times(4, (e) => {
    console.log(e)
    return _.constant(e)()//!constant函数式需要调用两次，因为这是一个闭包函数。
}))
// => [0, 0, 0, 0]
