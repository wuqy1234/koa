## string

- `toString`
- `valueOf`
- `charAt`
- `charCodeAt`
- `concat`
- `indexOf`
- `lastIndexOf`
- `localeCompare`
- `match`
- `replace`
- `search`
- `slice`
- `split`
- `substring`
- `toLowerCase`
- `toLocaleLowerCase`
- `toUpperCase`
- `toLocaleUpperCase`
- `trim`

### 这些方法都是JavaScript中Number对象和Date对象所具有的方法，用于格式化数字或日期的显示方式。

1. **toLocaleString()**
   - **用途**: 此方法返回一个字符串，表示某个日期或数字对象根据本地时间格式或数字格式进行格式化后的结果。这对于展示给用户友好的本地化数字和日期非常有用。
   - **适用对象**: Number, Date
2. **valueOf()**
   - **用途**: 返回对象的原始值，对于Number对象，它返回该数字的原始数值；对于Date对象，则返回自1970年1月1日00:00:00 UTC到该日期对象的毫秒数。
   - **适用对象**: 多种对象包括Number, Date等，用于获取对象的基本值。
3. **toFixed()**
   - **用途**: 只适用于Number对象，用于将数字转换为固定小数位数的字符串表示形式。
   - **参数**: 接受一个小数位数作为参数，如`.toFixed(2)`会保留两位小数。
4. **toExponential()**
   - **用途**: 将数字转换为科学记数法表示的字符串，其中小数点后有指定数量的数字。
   - **参数**: 可选的小数位数参数，决定指数表示中小数点后的位数。
   - **适用对象**: Number
5. **toPrecision()**
   - **用途**: 根据指定的精度返回数字的字符串表示，可以是固定小数位或科学记数法，取决于数字的大小。
   - **参数**: 指定整个数字的总长度（包括小数点和指数）。
   - **适用对象**: Number
6. `toString`把数字或日期转换为字符串。
7. 

## boolean

#### 语法

布尔值只有两个特定的值：`true` 和 `false`。

#### 属性

- `constructor`：返回字符串 `"Boolean"`。

#### 方法

- `toString`
- `valueOf`



## object

```javascript
console.log("Object" === {k:"1",v:"2"}.constructor)是什么?
```

这段代码的意思是通过`console.log`打印出一个布尔值，该布尔值表示字符串 `"Object"` 是否严格等于 (`===`) 一个包含键值对 `{k:"1",v:"2"}` 的对象的构造函数（constructor）属性。

具体分析如下：

- `{k:"1",v:"2"}` 是一个字面量对象，它的 `constructor` 属性指向创建该对象的构造函数，即 `Object` 构造函数，因为所有JavaScript对象（除非被修改）最终都继承自 `Object`。
- `typeof {k:"1",v:"2"}` 会返回 `"object"`，表示这是一个对象类型。
- 然而，`"Object"` 是一个字符串，而 `{}.constructor` 是一个函数引用（指向 `Object` 构造函数）。

由于 `===` 运算符不仅比较值，还比较类型，所以 `"Object"` （一个字符串）永远不会严格等于 `{}.constructor` （一个函数对象），即使后者在某种程度上代表了 `"Object"` 这个字符串所表示的概念。因此，这段代码实际上会输出 `false`。

```javascript
console.log("Object" == {k:"1",v:"2"}.constructor)返回true吧?
```

不，实际上 `console.log("Object" == {k:"1",v:"2"}.constructor)` 也会返回 `false`。虽然 `==` 运算符相比 `===` 会在比较前进行类型转换，但是字符串 `"Object"` 和 `{k:"1",v:"2"}` 对象的构造函数（即 `Object` 构造函数）之间不会因为宽松的相等性规则而被视为相等。

在JavaScript中，当使用 `==` 比较不同类型的值时，会尝试将它们转换为相同类型再进行比较。然而，当比较一方是字符串，另一方是对象（或者更具体地说，是函数，因为构造函数也是函数的一种）时，不会直接将对象或函数转换为字符串来与原字符串比较。而是首先检查它们是否是NaN（这不是这种情况），然后检查能否将两边转换成相同类型的原始值进行比较，但这不适用于对象（或其构造函数）与字符串之间的直接比较。

因此，即使构造函数的字符串表示可能是 `"function Object() { [native code] }"` 或简化的 `"function Object()"`，这也不会使其与 `"Object"` 字符串在宽松相等 (`==`) 比较下为 `true`。正确的做法是比较构造函数的名字，如通过 `{}.constructor.name` 获取构造函数的名字，然后与字符串比较，但即便如此，也应使用 `===` 来比较字符串，确保类型一致。



```javascript
 console.log("Object" === {
      k: "1",
      v: "2"
    }.constructor.name)//true
```



## array

#### 语法

array 支持以下的定义方式：

```text
var a = [];      //生成一个新的空数组

a = [1,"2",{},function(){}];  //生成一个新的非空数组，数组元素可以是任何类型
```

#### 属性

- `constructor`：返回字符串 `"Array"`。
- `length`

> 除constructor外属性的具体含义请参考 `ES5` 标准。

#### 方法

- `toString`
- `concat`
- `join`
- `pop`
- `push`
- `reverse`
- `shift`
- `slice`
- `sort`
- `splice`
- `unshift`
- `indexOf`
- `lastIndexOf`
- `every`
- `some`
- `forEach`
- `map`
- `filter`
- `reduce`
- `reduceRight`

#### 在js中，a = [1,"2",{},function(){}];数组中也可以有函数吗?

是的，在JavaScript中，数组是一种非常灵活的数据结构，它可以包含任何类型的元素，包括但不限于数字、字符串、对象、甚至是另一个数组或者函数。所以，你的例子 `a = [1,"2",{},function(){}` 完全正确，它定义了一个数组 `a`，其中包含了四种不同类型的元素：

1. 数字：`1`
2. 字符串：`"2"`
3. 对象（字面量）：`{}`
4. 函数：`function(){}`

这个函数作为一个元素存储在数组中，可以像访问其他数组元素一样通过索引访问，并且可以在需要时被调用执行。例如，如果你想要调用这个函数，你可以这样做：`a[3]()`。



## date

#### 语法

生成 date 对象需要使用 `getDate`函数, 返回一个当前时间的对象。

#### 属性

- `constructor`：返回字符串 “Date”。

#### 方法

- `toString`
- `toDateString`
- `toTimeString`
- `toLocaleString`
- `toLocaleDateString`
- `toLocaleTimeString`
- `valueOf`
- `getTime`
- `getFullYear`
- `getUTCFullYear`
- `getMonth`
- `getUTCMonth`
- `getDate`
- `getUTCDate`
- `getDay`
- `getUTCDay`
- `getHours`
- `getUTCHours`
- `getMinutes`
- `getUTCMinutes`
- `getSeconds`
- `getUTCSeconds`
- `getMilliseconds`
- `getUTCMilliseconds`
- `getTimezoneOffset`
- `setTime`
- `setMilliseconds`
- `setUTCMilliseconds`
- `setSeconds`
- `setUTCSeconds`
- `setMinutes`
- `setUTCMinutes`
- `setHours`
- `setUTCHours`
- `setDate`
- `setUTCDate`
- `setMonth`
- `setUTCMonth`
- `setFullYear`
- `setUTCFullYear`
- `toUTCString`
- `toISOString`
- `toJSON`
- 

## regexp

#### 语法

生成 regexp 对象需要使用 `getRegExp`函数。

```text
getRegExp(pattern[, flags])
```

- 参数：

  - `pattern`: 正则表达式的内容。

  - ```
    flags
    ```

    ：修饰符。该字段只能包含以下字符:

    - `g`: global
    - `i`: ignoreCase
    - `m`: multiline。

**示例代码：**

```text
var a = getRegExp("x", "img");
console.log("x" === a.source);
console.log(true === a.global);
console.log(true === a.ignoreCase);
console.log(true === a.multiline);
```

#### 属性

- `constructor`：返回字符串 `"RegExp"`。
- `source`
- `global`
- `ignoreCase`
- `multiline`
- `lastIndex`

> 除constructor外属性的具体含义请参考 `ES5` 标准。

#### 方法

- `exec`
- `test`
- `toString`

