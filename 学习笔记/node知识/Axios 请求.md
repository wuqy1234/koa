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