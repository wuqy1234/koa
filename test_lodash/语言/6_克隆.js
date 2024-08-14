const _ = require('loadsh');



var objects = [{ 'a': [{ c: 12 }] }, { 'b': 2 }];

var deep = _.cloneDeep(objects);
console.log(JSON.stringify(deep, null, 2));
console.log(deep[0] === objects[0], '1111111111111');

// 原生克隆,原生的克隆是引用，_.cloneDeep是深克隆，是递归的把对象的属性都克隆一份，得到一个新的对象。
let test = [];
Object.assign(test, objects);
console.log(JSON.stringify(test, null, 2));
console.log(test[0] === objects[0], '22222222222222222');



let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

let clone = Object.assign({}, user);

console.log(user.sizes === clone.sizes, '33333333333333'); // true，同一个对象

var deep = _.cloneDeep(user);

console.log(user.sizes === deep.sizes, '444444444444444'); // false，不是同一个对象

// user 和 clone 分享同一个 sizes
user.sizes.width++;       // 通过其中一个改变属性值
console.log(clone.sizes.width); // 51，能从另外一个获取到变更后的结果

