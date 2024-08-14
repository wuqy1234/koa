const _ = require('loadsh');


var object = { 'a': 1, 'b': '2', 'c': 3 };

_.omitBy(object, _.isNumber);
// => { 'b': '2' }

// console.log(''+_.isNumber)
// console.log('' + _.isObjectLike)
// console.log('' + _.baseGetTag)

function test(e, key) {//(value, key)。
    console.log(e, key, _.isNumber(e))
    return _.isNumber(e)//返回false将会被过滤掉。
}
console.log(_.omitBy(object, test));

console.log(_.omitBy(object, _.isNumber))