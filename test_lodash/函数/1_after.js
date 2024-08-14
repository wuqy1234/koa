const _ = require('loadsh');


var saves = ['profile', 'settings'];

var done = _.after(saves.length, function (obj) {
    console.log('done saving!' + '  ' + obj['type'] + '   ' + obj['complete']);
});
console.log(''+done);//使用加号能够把done函数表达式变成字符串
_.forEach(saves, function (type) {
    console.log(type);
    done({ 'type': type, 'complete': done });// done函数
});
// => Logs 'done saving!' after the two async saves have completed.
