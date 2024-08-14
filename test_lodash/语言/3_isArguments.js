const _ = require('loadsh');



_.isArguments(function () { return arguments; }());
// => true

_.isArguments([1, 2, 3]);
// => false

function test({ a, b }, c) {
    console.log(_.isArguments(arguments), arguments, a, b, c)
}
test({ a: 12, b: 13 }, 14)

