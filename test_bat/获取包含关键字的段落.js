const fs = require('fs');
let strPath = process.env.EVN_SELECTFILEPATH.replace(/\\/g, '/');
strPath = strPath.replace(/"/g, "")


const data = fs.readFileSync('C:/Users/86166/Desktop/初始合并.md');
const utf8String = data.toString('utf8');
let initData = utf8String.split('\r\n')
let keyword = process.env.EVN_KEYWORD.split('-');

// 在原始数据中获取包含关键词的段落
let KeywordData = []
initData.forEach((a) => {
    for (const key of keyword) {
        if (a.includes(key)) {
            KeywordData.push(a)
            KeywordData.push("+++++++++")
        }
    }
})

// 在包含关键词的数据中去除重复的段落-----除重，index会在删除了数组元素的时候动态发生变化，
// 所以在删除了一个数据后，那么就回到原来的索引位置开始重新循环，而不是只使用index--，
// 让循环结束，再回到原来的位置再次循环。由于index会在删除元素后动态变化，会导致一些元素被忽略，
// 在删除元素的瞬间，被删除的元素后面的元素会向左移，导致被删除的元素的那个位置被其他元素占用，
// 因此会导致无法遍历到，因此使用了index--和continue跳出循环，然后重新循环。通义千问和我的认识是一样的。
KeywordData.forEach((a, b) => {
    if (a != "+++++++++") {
        loop: for (let index = b + 1; index < KeywordData.length; index++) {
            const element = KeywordData[index];
            if (element != "+++++++++") {
                if (a.includes(element.slice(0, element.length / 2))) {
                    KeywordData.splice(index, 1)
                    if (KeywordData[index] == "+++++++++") {
                        KeywordData.splice(index, 1)
                    }
                    index--;
                    continue loop;
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
