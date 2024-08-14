const _ = require('loadsh');
const fs = require('fs');
const path = require('path');


// 参数
// [string = ''](string): 模板字符串.
// [options =](Object): 选项对象.
// [options.escape = _.templateSettings.escape](RegExp): "escape" 分隔符.
// [options.evaluate = _.templateSettings.evaluate](RegExp): "evaluate" 分隔符.
// [options.imports = _.templateSettings.imports](Object): 导入对象到模板中作为自由变量。
// [options.interpolate = _.templateSettings.interpolate](RegExp): "interpolate" 分隔符。
// [options.sourceURL = 'lodash.templateSources[n]'](string): 模板编译的来源URL。
// [options.variable = 'obj'](string): 数据对象的变量名。
// 返回
//   (Function): 返回编译模板函数。

// 使用 "interpolate" 分隔符创建编译模板
//!使用'<%='或'<%-'才能把参数中的值添加到模板中。
var compiled = _.template('hello <%= user %>!');//!'<%='是开始的插值分隔符，'%>'是结束的插值分隔符。<%=不会转义。
compiled({ 'user': 'fred' });
// => 'hello fred!'
console.log(compiled({ 'user': 'fred' }));


// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');//!'<%-'是开始的插值分隔符，'%>'是结束的插值分隔符。<%-转义。
compiled({ 'value': '<script>' });
// => '<b><script></b>'

//&lt; 和 &gt; 是用于防止HTML解析器将实际的 < 和 > 字符识别为HTML标签的开始和结束标记。
//<b>&lt;script&gt;</b> &lt等同是'<'，&gt等同于'>'。
console.log(compiled({ 'value': '<script>' }))
  ;

// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
//! <% _.forEach(users, function(user) { %>没有使用<%-或<%=所以不会加载到模板中。
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
console.log(compiled({ 'users': ['fred', 'barney'] }))



// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% console.log("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'

console.log(compiled({ 'user': 'barney' }))


// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'

// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'

// // 使用反斜杠符号作为纯文本处理
// var compiled = _.template('<%= "\\<%- value %\\>" %>');
// compiled({ 'value': 'ignored' });
// // => '<%- value %>'

// // 使用 `imports` 选项导入 `jq` 作为 `jQuery` 的别名
// var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
// var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
// compiled({ 'users': ['fred', 'barney'] });
// // => '<li>fred</li><li>barney</li>'

// // 使用 `sourceURL` 选项指定模板的来源URL
// var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
// compiled(data);
// // => 在开发工具的 Sources 选项卡 或 Resources 面板中找到 "greeting.jst"

// // 使用 `variable` 选项确保在编译模板中不声明变量
// var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
// compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }

// 使用 `source` 特性内联编译模板
// 便以查看行号、错误信息、堆栈
// fs.writeFileSync(path.join(cwd, 'jst.js'), '\
//   var JST = {\
//     "main": ' + _.template(mainText).source + '\
//   };\
// ');
