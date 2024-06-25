在Node.js中，Buffer 是一个全局对象，用于处理二进制数据。Buffer 类提供了许多方法来创建、操作和转换二进制数据。以下是一些常见的使用场景和方法：

### 创建 Buffer

1. 从字符串创建 Buffer
      
   ```js
   const buf = Buffer.from('Hello, world!', 'utf-8');
      console.log(buf); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>
      ```
      
      
      
2. 从数组创建 Buffer
      
   ```js
   const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      console.log(buf.toString()); // 'Hello'
      ```
      
      
      
3. 创建指定长度的 Buffer
      
   ```js
   const buf = Buffer.alloc(10); // 创建一个长度为10的Buffer，初始填充为0
   console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>
   ```
   
   

### 写入 Buffer

```js
const buf = Buffer.alloc(10);
buf.write('Hello');
console.log(buf.toString('utf-8', 0, 5)); // 'Hello'
```




### 读取 Buffer

```js
const buf = Buffer.from('Hello, world!', 'utf-8');
console.log(buf.toString('utf-8', 0, 5)); // 'Hello'
```




### Buffer 转换

1. Buffer 转字符串
      
   ```js
   const buf = Buffer.from('Hello, world!', 'utf-8');
   const str = buf.toString('utf-8');
      console.log(str); // 'Hello, world!'
      ```
      
      
      
2. Buffer 转 JSON
      
   ```js
   const buf = Buffer.from('Hello, world!', 'utf-8');
   const json = buf.toJSON();
   console.log(json); // { type: 'Buffer', data: [ 72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33 ] }
   ```
   
   
   

### 拼接 Buffers

```js
const buf1 = Buffer.from('Hello, ');
const buf2 = Buffer.from('world!');
const buf = Buffer.concat([buf1, buf2]);
console.log(buf.toString()); // 'Hello, world!'
```




### 比较 Buffers

```js
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('ABD');
const result = buf1.compare(buf2);
console.log(result); // -1, 表示 buf1 在 buf2 之前
```




### 拷贝 Buffers

```js
const buf1 = Buffer.from('Hello, world!');
const buf2 = Buffer.alloc(5);
buf1.copy(buf2, 0, 0, 5);
console.log(buf2.toString()); // 'Hello'
```




### 其他常用方法

1. 填充 Buffer
      
   ```js
   const buf = Buffer.alloc(10);
   buf.fill('a');
      console.log(buf.toString()); // 'aaaaaaaaaa'
      ```
      
      
      
2. 切片 Buffer
      
   ```js
   const buf = Buffer.from('Hello, world!', 'utf-8');
   const slice = buf.slice(0, 5);
   console.log(slice.toString()); // 'Hello'
   ```
   
   

通过这些方法和操作，你可以在Node.js中灵活地处理二进制数据。



### 理解

创建buffer,方便传输

 const buf = Buffer.from('Hello, world!', 'utf-8');

把buffer的数据转换为可读的字符串

 console.log(buf.toString()); // 'Hello, world!