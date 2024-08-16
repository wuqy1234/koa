const fs = require('fs');

let initData = []
try {
    const data = fs.readFileSync('C:/Users/86166/Desktop/初始合并.txt');
    const utf8String = data.toString('utf8');
    initData = utf8String.split('\r\n')
} catch (err) {
    console.error('读取文件失败:', err);
}
// 这里是爬取有重复的数据，而不是除重，爬取到了重复的数据后，后面就能手动的去查找这些重复的数据。
let outputData= []
initData.forEach((a, b) => {
    for (let index = b + 1; index < initData.length; index++) {
        const element = initData[index];
        if (a == element) {
            if (!outputData.includes(a)) {
                outputData.push(a)
                outputData.push("+++++++++")
            }
        }
    }
})

const dataAsString = outputData.join('\n');
fs.writeFile('C:\\Users\\86166\\Desktop\\已处理的数据.md', dataAsString, 'utf8', (err) => {
    if (err) {
        console.error('写入失败:', err);
        return;
    }
    console.log('写入成功');
});