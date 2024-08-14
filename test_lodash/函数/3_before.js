const _ = require('loadsh');

const addContactToList = (function () {
    let a = 0
    return function () {
        console.log(a);
        return a++

    }
})()

const aa = _.before(5, addContactToList)
aa();
aa();
aa();
aa();
aa();//第5次调用后，addContactToList不再执行
console.log(aa());//调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用func的结果。
console.log(aa());