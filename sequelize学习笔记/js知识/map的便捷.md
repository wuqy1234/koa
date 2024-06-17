map把对象中的值拿过来加到一个新的数组中

```javascript
  const childrenNames = sons[0].Children.map(child => child.name);
```

map把数组中的值遍历出来,然后把每个值放到一个函数中执行,最后返回一个新数组，正好是`Promise.all`需要的

```javascript
 childrenNames.map(async childName => {
                    const subGrandchildren = await getChildren(childName, depth - 1);
                    grandchildren = grandchildren.concat(subGrandchildren || []); 
                })
```



```javascript
if (sons.length > 0) {
            const childrenNames = sons[0].Children.map(child => child.name);

            // 确保等待所有子任务完成
            await Promise.all(
                childrenNames.map(async childName => {
                    const subGrandchildren = await getChildren(childName, depth - 1);
                    grandchildren = grandchildren.concat(subGrandchildren || []); // 如果子任务返回null或undefined，则忽略
                })
            );
```

