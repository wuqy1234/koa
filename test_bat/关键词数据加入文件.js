const fs = require('fs');

let keyword = process.env.EVN_KEYWORD.replace(/\\/g, '/');
keyword = keyword.replace(/"/g, "")

const keywordData = fs.readFileSync(`${keyword}`);
const keywordDataUTF8 = keywordData.toString('utf8');
keyword = keywordDataUTF8.split(`\n`)



let content = process.env.ENV_CONTENT.replace(/\\/g, '/');
content = content.replace(/"/g, "")
let contentPath = content.replace(/\.[\w]+/g, '') + '拼接关键词.md'

const contentData = fs.readFileSync(`${content}`);
const contentDataUTF8 = contentData.toString('utf8');
content = contentDataUTF8.split(`\n`)

let exclude = []
// 判断目标文件中是否存在关键词段落，存在就记录到排除项。
keyword.forEach((a) => {
    if (!a.includes('++++++')) {
        content.forEach((c) => {
            if (c != '\r' && !c.includes('#')) {
                if (c.includes(a)) {
                    exclude.push(a)
                }
            }
        })
    }
});

for (let index = 0; index < keyword.length; index++) {
    const element = keyword[index];
    if (element != "+++++++++") {
        for (const paragraph of exclude) {
            if (element == paragraph) {
                keyword.splice(index, 1)
                index--;
                continue
            }
        }
    }
}

keyword.forEach((a) => {
    if (!a.includes('++++++')) {
        content.push(a)
        content.push('++++++')
    }
})


const dataAsString = content.join('\n');
fs.writeFile(`${contentPath}`, dataAsString, 'utf8', (err) => {
    if (err) {
        console.error('写入失败:', err);
        return;
    }
    console.log('写入成功');
});



