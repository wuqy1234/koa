在JavaScript中，`void`是一个一元运算符，它后面跟着一个表达式，这个表达式的值会被计算，但是`void`运算符会强制使整个表达式的结果为`undefined`。

当你执行`void 3`时，数字`3`被计算（实际上就是它本身），但是因为前面有`void`运算符，最终的结果会被转换成`undefined`。

所以，如果你使用Lodash库中的`_.isNil`方法检查`void 3`的结果，如下所示：

```js
const _ = require('loadsh');
_.isNil(void 3);
```

这将会返回`true`，因为`void 3`的结果是`undefined`，而`_.isNil`方法用于检查一个值是否为`null`或`undefined`。

注意：`_.isNil`是Lodash库中的一个实用函数，如果你的环境中没有Lodash，你需要先引入Lodash库或者使用原生JavaScript的`typeof`操作符来检查一个值是否为`undefined`：

```js
typeof void 3 === 'undefined'; // true
```

