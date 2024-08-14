const _ = require('loadsh');


function vowels(string) {
    return _.filter(string, function (v) {
        return /[aeiou]/i.test(v);
    });
}

//!这里混入的是loadsh的原型，是隐式链，只能调用一次。现在vowels是loadsh的实例方法。
_.mixin({ 'vowels': vowels });
_.vowels('fred');
// => ['e']
console.log(_.vowels('fred'));
// console.log(_.vowels('fred').value());//会报错
console.log(_('fred').vowels().value());
_('fred').vowels().value();
// => ['e']
console.log(_('seed').chain().vowels().first().value())//开启了显式链，可以使用更多的lodash方法。

_.mixin({ 'vowels': vowels }, { 'chain': false });//{ 'chain': false }这个设置有问题，没有起作用。
_('fred').vowels();
// => ['e']

