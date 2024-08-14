const fs = require('fs');
let strPath = process.env.EVN_SELECTFILEPATH.replace(/\\/g, '/');
strPath = strPath.replace(/"/g, "")

let initData = []
try {
    const data = fs.readFileSync('C:/Users/86166/Desktop/初始合并.txt');
    const utf8String = data.toString('utf8');
    initData = utf8String.split('\r\n')
} catch (err) {
    console.error('读取文件失败:', err);
}
let KeywordData = []
initData.forEach((a) => {
    if (a.includes(process.env.ENV_VARIABLE)) {
        KeywordData.push(a)
    }
})
let outputData = []
KeywordData.forEach((a, b) => {
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
fs.writeFile(`${strPath + '/' + '关键字为' + process.env.ENV_VARIABLE + '.md'}`, dataAsString, 'utf8', (err) => {
    if (err) {
        console.error('写入失败:', err);
        return;
    }
    console.log('写入成功');
});