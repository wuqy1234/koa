
// const { spawn } = require('child_process');
const fs = require('fs');

//以下的spawn函数能够运行bat文件
// const batProcess = spawn('cmd.exe', ['/c', "C:\\Users\\86166\\Desktop\\koa-1\\test_bat\\除重.bat"]);

// batProcess.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// batProcess.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// batProcess.on('close', (code) => {
//   console.log(`Child process exited with code ${code}`);
// });


let initData = []
let excludeData = []
try {
    const data = fs.readFileSync('C:\\Users\\86166\\Desktop\\序号初步去重.txt');
    const data2 = fs.readFileSync('C:\\Users\\86166\\Desktop\\需排除的序号.txt');
    // 将 Buffer 转换为 UTF-8 字符串
    const utf8String = data.toString('utf8');
    const utf8String2 = data2.toString('utf8');
    initData = utf8String.split('\r\n')
    excludeData = utf8String2.split('\r\n')

} catch (err) {
    console.error('Error reading the file:', err);
}
initData.forEach((a,b)=>{
    excludeData.forEach((c)=>{
        if(a==c){
            initData.splice(b,1)
        }
    })
})



const dataAsString = initData.join('\n');

fs.writeFile('C:\\Users\\86166\\Desktop\\已处理的数据.md', dataAsString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Data written successfully to file.');
});

// spawn('cmd.exe', ['/c', "C:\\Users\\86166\\Desktop\\koa-1\\test_bat\\除重.bat"]);