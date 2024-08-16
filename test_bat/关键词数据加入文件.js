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

let exclude = []
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
keyword.forEach((a, b) => {
    if (!a.includes('++++++')) {
        for (const paragraph of exclude) {
            if (a.includes(paragraph)) {
                keyword.splice(b, 1)
            }
        }
    }
})
keyword.forEach((a, b) => {
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



