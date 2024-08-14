const _ = require('loadsh');

//!
/**
 * _.escape([string=''])
 * [string=''] (string): 要转义的字符串。
 * 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
 * (string): 返回转义后的字符串。
 */
_.escape('fred, barney, & pebbles');
// => 'fred, barney, & pebbles'


//_.escape包装在function (func, text)的func中。text是需要转发的参数(透传给func)。
var p = _.wrap(_.escape, function (func, text) {
    return '<p>' + func(text) + '</p>';
});
//传递的参数直接转发(透传)给函数func
const aa=p('fred, barney, & pebbles');
// => '<p>fred, barney, & pebbles</p>'
console.log(aa);
