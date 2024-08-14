const _ = require('loadsh');





function Foo() {
    this.a = 1;
    this.b = 2;
}

Foo.prototype.c = 3;

console.log(new Foo);
const aa=new Foo();
console.log(aa.c);

_.forIn(new Foo, function (value, key) {
    console.log(key, value);
});
// => Logs 'a', 'b', then 'c' (无法保证遍历的顺序)。

_.forOwn(new Foo, function (value, key) {
    console.log(key);
});

