> cos可能是一个class，在使用new cos时会自动执行构造器，构造器其实就是一个class中的方法，在使用new时会执行，此时可以传递的函数getAuthorization必定是class的内部声明好了的函数，里面传递的各种option在此时会写入cos的属性中，如果一些option在new cos时没有传递，在实例化后传递，那么调用实例中的函数，就能再次传递了，此时就会写入此class的属性中了。
>

```javascript
async function initcos() {
    const COS = require('cos-nodejs-sdk-v5')
    try {
        this.cos = new COS({
            getAuthorization: async function (options, callback) {
                const res = await call({
                    url: 'http://api.weixin.qq.com/_/cos/getauth',
                    method: 'GET',
                    data: {}// 可从 options 取需要的参数
                })
                const auth = {
                    TmpSecretId: res.TmpSecretId,// 临时密钥的 tmpSecretId
                    TmpSecretKey: res.TmpSecretKey,// 临时密钥的 tmpSecretId
                    SecurityToken: res.Token,// 临时密钥的 sessionToken
                    ExpiredTime: res.ExpiredTime// 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
                }
                callback(auth)
            }
        })
        console.log('COS初始化成功')
    } catch (e) {
        console.log('COS初始化失败',)
    }
}
```

getAuthorization 的函数说明：

| 参数名   | 参数描述                                                     | 类型     |
| -------- | ------------------------------------------------------------ | -------- |
| options  | 获取临时密钥需要的参数对象                                   | Object   |
| - Bucket | 存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式 | String   |
| - Region | 存储桶所在地域，枚举值请参见 [地域和访问域名](https://cloud.tencent.com/document/product/436/6224) | String   |
| callback | 临时密钥获取完成后的回传方法                                 | Function |

Bucket和Region是options中属性



获取完临时密钥后，callback 回传一个对象，回传对象的属性列表如下：

| 属性名        | 参数描述                                                     | 类型   | 是否必填 |
| ------------- | ------------------------------------------------------------ | ------ | -------- |
| TmpSecretId   | 获取回来的临时密钥的 tmpSecretId                             | String | 是       |
| TmpSecretKey  | 获取回来的临时密钥的 tmpSecretKey                            | String | 是       |
| SecurityToken | 获取回来的临时密钥的 sessionToken，对应 header 的 x-cos-security-token 字段 | String | 是       |
| StartTime     | 密钥获取的开始时间，即获取时刻的时间戳，单位秒，startTime，如：1580000000，用于签名开始时间，传入该参数可避免前端时间偏差签名过期问题 | String | 是       |
| ExpiredTime   | 获取回来的临时密钥的 expiredTime，超时时刻的时间戳，单位秒，如：1580000900 | String | 是       |

#### 



### 上传对象

该接口适用于小文件上传，大文件请使用分块上传接口，详情请参见 [对象操作](https://cloud.tencent.com/document/product/436/36119) 文档。



```js
cos.putObject({
    Bucket: 'examplebucket-1250000000', /* 必须 */
    Region: 'COS_REGION',    /* 必须 */
    Key: 'exampleobject',              /* 必须 */
    StorageClass: 'STANDARD',
    Body: fs.createReadStream('./exampleobject'), // 上传文件对象
    onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
    }
}, function(err, data) {
    console.log(err || data);
});
```

### 查询对象列表



```js
cos.getBucket({
    Bucket: 'examplebucket-1250000000', /* 必须 */
    Region: 'COS_REGION',     /* 必须 */
    Prefix: 'a/',           /* 非必须 */
}, function(err, data) {
    console.log(err || data.Contents);
});
```

### 下载对象



```js
cos.getObject({
    Bucket: 'examplebucket-1250000000', /* 必须 */
    Region: 'COS_REGION',    /* 必须 */
    Key: 'exampleobject',              /* 必须 */
    Output: fs.createWriteStream('./exampleobject'),
}, function(err, data) {
    console.log(err || data);
});
```

### 删除对象



```js
cos.deleteObject({
    Bucket: 'examplebucket-1250000000', /* 必须 */
    Region: 'COS_REGION',    /* 必须 */
    Key: 'exampleobject'       /* 必须 */
}, function(err, data) {
    console.log(err || data);
});
```
