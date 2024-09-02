// 只做一些简单的数学运算，避免传入的是函数，利用这个漏洞访问内部数据，带来安全问题。
// 使用正则表达式来检索字符串中是否包含字母，如果包含了，就不使用eval。
let str = "1+2+3*5";
let result = eval(str);
console.log(result);
let test = `(function hello(){
    console.log("你好，这是一个测试，使用了eval运行的函数。");
})()`;
eval(test);

let test1 = `(function hello(){
       console.log("你好，这是一个测试，使用了eval运行的函数。");
   })`;

// 使用 new Function 安全地创建一个函数并执行 ,注意是new Function，不是new function ，F大写了，不同于构造函数。
const safeEval = (code) => {
  try {
    //  new Function只能运行字符串函数，不能运行"1+2+3*5"。
    const fn = new Function(code);
    fn();
  } catch (e) {
    console.error("Error executing code:", e);
  }
};

safeEval(test1 + "();");
