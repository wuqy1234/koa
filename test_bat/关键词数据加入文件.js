const fs = require('fs');

let keyword = process.env.EVN_KEYWORD.replace(/\\/g, '/');
keyword = keyword.replace(/"/g, "")

const keywordData = fs.readFileSync(`${keyword}`);
const keywordDataUTF8 = keywordData.toString('utf8');
keyword = keywordDataUTF8.split(`\n`)



let content = process.env.ENV_CONTENT.replace(/\\/g, '/');
content = content.replace(/"/g, "")
let contentPath = content.replace(/\.[\w]+/g, '') + '拼接数据.md'

const contentData = fs.readFileSync(`${content}`);
const contentDataUTF8 = contentData.toString('utf8');
content = contentDataUTF8.split(`\n`)


keyword.forEach((a, b) => {
    if (a != '+++++++++') {
        content.forEach((c) => {
            if (c != '') {
                if (c.includes(a.slice(0, a.length / 2))) {
                    keyword.splice(b, 1)
                    // 在删除了一个元素时，index值可能是动态变化的。
                    if (keyword[b + 1] == '+++++++++') {
                        keyword.splice(b + 1, 1)
                    }
                    if (keyword[b - 1] == '+++++++++') {
                        keyword.splice(b - 1, 1)
                    }
                }
            }
        })
    }
});

content = content.concat(keyword)

const dataAsString = content.join('\n');
fs.writeFile(`${contentPath}`, dataAsString, 'utf8', (err) => {
    if (err) {
        console.error('写入失败:', err);
        return;
    }
    console.log('写入成功');
});



