const fs = require('fs');
let strPath = process.env.EVN_SELECTFILEPATH.replace(/\\/g, '/');
strPath = strPath.replace(/"/g, "")


const data = fs.readFileSync('C:/Users/86166/Desktop/初始合并.md');
const utf8String = data.toString('utf8');
let initData = utf8String.split('\r\n')


// 在原始数据中获取包含关键词的段落
let KeywordData = []
initData.forEach((a) => {
    if (a.includes(process.env.EVN_KEYWORD)) {
        KeywordData.push(a)
        KeywordData.push("+++++++++")
    }
})
// console.log(KeywordData)
// 在包含关键词的数据中去除重复的段落-----除重
KeywordData.forEach((a, b) => {
    if (a != "+++++++++") {
        for (let index = b + 1; index < KeywordData.length; index++) {
            const element = KeywordData[index];
            if (element != "+++++++++") {
                if (a.includes(element.slice(0, element.length / 2))) {
                    KeywordData.splice(index, 1)
                    if (KeywordData[index] == "+++++++++") {
                        KeywordData.splice(index, 1)
                    }
                }
            }
        }
    }
})


const dataAsString = KeywordData.join('\n');
fs.writeFile(`${strPath + '/' + '关键字为' + process.env.EVN_KEYWORD + '.md'}`, dataAsString, 'utf8', (err) => {
    if (err) {
        console.error('写入失败:', err);
        return;
    }
    console.log('写入成功');
});
