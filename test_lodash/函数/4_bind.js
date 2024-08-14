const _ = require('loadsh');


var object = {
    'user': 'fred',
    'greet': function (greeting, punctuation) {
        return greeting + ' ' + this.user + punctuation;
    }
};

var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
    return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// Bound with placeholders.
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'

let bound1 = _.bind(object['greet'], object, 'hi');
// console.log(bound1('!'));





//原生的bind

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

// setTimeout(user.sayHi.bind(user), 1000);
//动态的调用，使用了重新定义的user。
// setTimeout(() => { user.sayHi.bind(user)() }, 1000);

const sayHi = user.sayHi.bind(user);
// ……user 的值在不到 1 秒的时间内发生了改变
user = {
    sayHi() { console.log("Another user in setTimeout!"); }
};
// sayHi();// Hello, John!



//使用_.bind(object['greet'], object);重写以上示例

let user1 = {
    firstName: "John",
    sayHi1() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(_.bind(user1['sayHi1'], user1), 1000);
//动态的调用，使用了重新定义的user。
setTimeout(() => { _.bind(user1['sayHi1'], user1)() }, 1000);

const sayHi1 = _.bind(user1['sayHi1'], user1);
// ……user 的值在不到 1 秒的时间内发生了改变
user1 = {
    sayHi1() { console.log("Another user in setTimeout!"); }
};
sayHi1();// Hello, John!
