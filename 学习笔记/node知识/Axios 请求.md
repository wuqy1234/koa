Axios 是一个基于 promise 的 HTTP 库，可以用于浏览器和 node.js 中，它易于使用并且支持多种请求类型。下面是一些使用 Axios 发起不同类型的 HTTP 请求的基本示例。

### 安装 Axios

首先，确保你已经安装了 Axios。在项目目录下运行：

```sh
npm install axios
```

### GET 请求

```js
const axios = require('axios');

axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data); // 打印响应数据
  })
  .catch(error => {
    console.error('请求失败:', error);
  });
```

### POST 请求

```js
axios.post('https://api.example.com/submit', 
  { 
    key1: 'value1',
    key2: 'value2'
  }, 
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('请求出错:', error);
});
```

### 添加请求拦截器

```js
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么，比如添加认证信息
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});
```

### 添加响应拦截器

```js
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么，比如错误处理或重新登录
  if (error.response.status === 401) {
    // 处理未授权的情况
  }
  return Promise.reject(error);
});
```

### 异步等待 (async/await)

```js
async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

fetchData();
```

以上示例涵盖了基本的 GET 和 POST 请求，以及如何使用拦截器和异步等待来处理请求和响应。Axios 提供了丰富的配置选项和强大的功能，能够满足大多数网络请求的需求。



**`axios`库发送HTTP请求返回的数据格式为对象:**

```javascript
async function call(obj) {
  try {
    const response = await axios({
      url: obj.url,
      method: obj.method || 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: obj.data || {}
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

在JavaScript中，`axios`库发送HTTP请求，其返回的`response`是一个包含多个属性的对象，其中最重要的是`data`属性，该属性包含了服务器响应的数据。这取决于服务器返回的内容，`response.data`可能是对象、数组、字符串等类型。如果服务器返回的是JSON格式的数据且被正确解析，那么`response.data`将会是一个JavaScript对象或数组。因此，`response`本身是一个对象，而`response.data`可能是一个对象。

如果是request而不是axios返回的是字符串吗，需要使用JSON.parse转换为对象，对吗?

```javascript
const auth = JSON.parse(authres)
```

是的，如果你使用原生的`XMLHttpRequest`或`fetch`等方法进行HTTP请求，并且服务器返回的是JSON格式的字符串，那么你需要使用`JSON.parse()`方法来将这个字符串转换成JavaScript对象。



#### Ajax和axios有什么区别吗?

Ajax（Asynchronous JavaScript and XML）和 Axios 都是用于在客户端与服务器之间进行异步通信的技术和工具，但它们有一些显著的区别。以下是它们的详细对比：

\### Ajax

定义：Ajax 是一种技术集合，用于在不重新加载整个网页的情况下，从服务器请求数据并在网页上进行更新。它通常使用原生的 `XMLHttpRequest` 对象来实现。

特点：

1. 原生支持：Ajax 是浏览器原生支持的技术，不需要额外的库。

1. 复杂性：使用原生的 `XMLHttpRequest` 进行 Ajax 请求可能比较复杂，需要处理各种状态变化、事件监听等。

1. 兼容性：原生的 Ajax 需要处理不同浏览器的兼容性问题。

示例：

```javascript
// 使用原生 XMLHttpRequest 进行 Ajax 请求
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

\### Axios

定义：Axios 是一个基于 Promise 的 HTTP 客户端，用于在浏览器和 Node.js 中发送 HTTP 请求。它对 `XMLHttpRequest` 进行了封装，提供了更简洁的 API。

特点：

1. 基于 Promise：Axios 使用 Promise 进行异步操作，使得代码更加简洁和易于阅读。

1. 更好的语法：Axios 提供了更简洁和直观的 API，简化了请求和响应处理。

1. 自动转换：Axios 自动将 JSON 数据转换为 JavaScript 对象，并处理其他常见的数据格式。

1. 内置功能：Axios 提供了许多内置功能，如请求和响应拦截器、取消请求、超时设置等。

1. 跨平台：Axios 可以在浏览器和 Node.js 环境中使用。

示例：

```javascript
// 使用 Axios 进行 HTTP 请求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

\### 对比总结

- 复杂性：Ajax 使用原生 `XMLHttpRequest` 可能比较复杂，需要处理各种状态变化和事件监听；而 Axios 提供了更简洁和直观的 API。

- 异步处理：Ajax 需要手动处理异步操作，而 Axios 基于 Promise，异步处理更加简洁。

- 功能：Axios 提供了许多内置功能，如请求和响应拦截器、取消请求、超时设置等，而这些功能在使用原生 Ajax 时需要手动实现。

- 兼容性：Axios 处理了许多浏览器兼容性问题，而使用原生 Ajax 需要自己处理这些问题。

- 数据处理：Axios 自动处理 JSON 数据的转换，而原生 Ajax 需要手动处理。

\### 何时使用

- Ajax：如果你不想引入额外的库并且只需要进行简单的请求，原生的 Ajax 可能是一个不错的选择。

- Axios：如果你需要进行复杂的请求处理、使用 Promise 以及需要更多的内置功能，Axios 是一个更好的选择。