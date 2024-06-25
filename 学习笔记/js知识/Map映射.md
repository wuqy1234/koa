> #### new map()的一个键可以添加多个值吗?

在JavaScript的`Map`数据结构中，一个键（key）只能对应一个值（value）。但是，如果你想让一个键对应多个值，可以通过将该键的值设为一个集合（如数组或Set）来实现。

例如：

```javascript
const myMap = new Map();
// 添加一个键，其值是一个数组
myMap.set('room1', []);

// 向该键对应的数组中添加多个值
myMap.get('room1').push('client1');
myMap.get('room1').push('client2');

// 结果：myMap 中的 'room1' 键现在关联着一个包含 'client1' 和 'client2' 的数组
```

在这个例子中，尽管`Map`的键`'room1'`仍然只对应一个值（即那个数组），但这个值本身可以包含多个元素，从而间接实现了“一个键对应多个值”的效果。

- `map.delete(key)` —— 删除指定键的值。
- `map.delete(key)` —— 删除指定键对应的值，如果在调用时 `key` 存在，则返回 `true`，否则返回 `false`。