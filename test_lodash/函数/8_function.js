const _ = require('loadsh');


console.log(_.times(3, Number))
// => ['0', '1', '2']

console.log(_.times(4, _.constant(0)))
// => [0, 0, 0, 0]
function Foo() {
    this.a = _.constant('a');
    this.b = _.constant('b');
    this.e = function () { return 'e' };
    this.f = 123
}

Foo.prototype.c = _.constant('c');

const aa = _.functions(new Foo);//返回对象中的函数名，如果不是函数，那么就不会返回。
// => ['a', 'b']
console.log(aa);

const bb=_.functionsIn(new Foo);
// => ['a', 'b', 'c']
console.log(bb);