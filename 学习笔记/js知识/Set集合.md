> set集合有什么用法?

JavaScript中的`Set`集合是一种特殊的类数组对象，用于存储唯一值。它的主要用途和用法包括但不限于以下几点：

1. **去重**：由于`Set`中的元素必须唯一，你可以轻松地通过将一个数组转换为`Set`来去除其中的重复项。

```javascript
   const array = [1, 2, 2, 3, 4, 4, 5];
   const uniqueArray = [...new Set(array)];
```

1. **成员检查**：使用`has()`方法快速检查一个值是否存在于集合中。

```js
javascript   const set = new Set([1, 2, 3]);
   console.log(set.has(2)); // 输出: true
```

1. **添加元素**：使用`add()`方法向集合中添加元素。如果尝试添加的元素已经存在，则不会有任何变化。

```js
javascript   const set = new Set();
   set.add(1);
   set.add(2);
```

1. **删除元素**：使用`delete()`方法从集合中移除一个元素。

```js
javascript   const set = new Set([1, 2, 3]);
   set.delete(2);
```

1. **清空集合**：使用`clear()`方法清空集合中的所有元素。

```js
javascript   const set = new Set([1, 2, 3]);
   set.clear();
```

1. **迭代**：`Set`是可迭代的，可以直接用于循环遍历，或者通过扩展运算符转换为数组。

```js
javascript   const set = new Set(['apple', 'banana', 'cherry']);
   for(let item of set) {
       console.log(item);
   }
```

1. **集合运算**：与其他集合进行交集、并集、差集等运算，这通常需要结合扩展运算符或`Array.from()`等方法来实现。
2. **作为函数参数的唯一性保障**：在某些场景下，你可能希望函数的某些参数只接受唯一的值，这时可以先将参数转换为`Set`再进行后续处理。

`Set`集合因其能够高效地处理唯一性问题，在处理数据去重、集合运算等场景下非常有用。