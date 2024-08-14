const _ = require('loadsh');


var object = {};

_.setWith(object, '[0][1]', 'a', Object);
// => { '0': { '1': 'a' } }
console.log(_.setWith(object, '[0][1]', 'a', Object))

console.log(_.setWith(object, '[0][1]', 'a', new Object))

