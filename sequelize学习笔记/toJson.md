```js
const jane = await User.create({ name: "Jane" });
console.log(jane); 
console.log(jane.toJSON()); 
console.log(JSON.stringify(jane, null, 4)); 

console.log会打印出什么?
```

###### 在 Sequelize 中，当你创建一个新的用户并使用 console.log 打印该用户对象时，会有不同的输出格式。以下是你提供的代码片段以及每个 console.log 的输出解释：

### 代码片段

```js
const jane = await User.create({ name: "Jane" });
console.log(jane); 
console.log(jane.toJSON()); 
console.log(JSON.stringify(jane, null, 4));

```

### 输出解释

1. console.log(jane)

   这将打印出 jane 对象的完整 Sequelize 实例，包括所有的内部属性和方法。输出会非常详细，包含很多元数据和内部方法，类似于：

   ```json
      User {
     dataValues: { id: 1, name: 'Jane', createdAt: ..., updatedAt: ... },
     _previousDataValues: { id: 1, name: 'Jane', createdAt: ..., updatedAt: ... },
     uniqno: 1,
     _changed: Set {},
     _options: { ... },
     isNewRecord: false,
     ...
   }
   ```


   这里的 dataValues 属性包含了实际存储在数据库中的数据。

2. console.log(jane.toJSON())

   这将调用 toJSON 方法，返回一个纯粹的 JavaScript 对象，只包含模型的实际数据值。这是一个更简洁的输出，类似于：

      {

   ```json
     "id": 1,
     "name": "Jane",
     "createdAt": "2024-06-07T11:04:32.000Z",
     "updatedAt": "2024-06-07T11:04:32.000Z"
   }
   ```


   这个输出只包含模型的属性，而不包含任何 Sequelize 的内部元数据。

3. console.log(JSON.stringify(jane, null, 4))

   这将使用 JSON.stringify 方法将 jane 对象转换为 JSON 字符串，并且使用 null 和 4 作为参数来格式化输出（每个缩进级别使用 4 个空格）。输出将与 jane.toJSON() 的结果类似，但它是一个格式化的 JSON 字符串：

   ```json
      {
       "id": 1,
       "name": "Jane",
       "createdAt": "2024-06-07T11:04:32.000Z",
       "updatedAt": "2024-06-07T11:04:32.000Z"
   }
   ```
   
   

### 示例

假设你的 User 模型定义如下：

```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

(async () => {
  await sequelize.sync({ force: true });

  const jane = await User.create({ name: "Jane" });
  console.log(jane);
  console.log(jane.toJSON());
  console.log(JSON.stringify(jane, null, 4));
})();
```

运行这段代码后，输出将会是：

console.log(jane):

```js
User {
dataValues: { id: 1, name: 'Jane', createdAt: ..., updatedAt: ... },
_previousDataValues: { id: 1, name: 'Jane', createdAt: ..., updatedAt: ... },
uniqno: 1,
_changed: Set {},
_options: { ... },
isNewRecord: false,
...
}
```

   

console.log(jane.toJSON()):

```js
1. {
   "id": 1,
   "name": "Jane",
 "createdAt": "2024-06-07T11:04:32.000Z",
 "updatedAt": "2024-06-07T11:04:32.000Z"
    }
 
 2. console.log(JSON.stringify(jane, null, 4)):
    {
     "id": 1,
     "name": "Jane",
     "createdAt": "2024-06-07T11:04:32.000Z",
     "updatedAt": "2024-06-07T11:04:32.000Z"
    }
```

 

### 总结

- console.log(jane) 打印出完整的 Sequelize 实例，包含很多内部属性和方法。
- console.log(jane.toJSON()) 返回一个纯粹的 JavaScript 对象，只包含模型的实际数据值。
- console.log(JSON.stringify(jane, null, 4)) 返回一个格式化的 JSON 字符串，表示模型的实际数据值。

这些不同的打印方法可以帮助你在调试和日志记录时，选择合适的输出格式。