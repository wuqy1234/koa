const { createUser, getUerInfo } = require('../service/user.service')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default')

// 发起请求 --> controller --> service --> model --> 操作数据 --> 
//使用了 sequelize 完成对数据的保存操作
class UserController {

    // 方法被 async 修饰了，调用处必须加上await
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)

        const { username, password } = ctx.request.body


        // 2. 操作数据库
        const res = await createUser(username, password)
        // console.log(res, 'lllllllllllllllllllllllllllll')
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            },
        }
    }

    async login(ctx, next) {
        const { username } = ctx.request.body;

        /**
         * try...catch 语句在编程中用于捕获和处理错误。它不仅能够检测手动抛出的错误，
         * 还能自动捕获运行时产生的各种错误。以下是 try...catch 能够捕获的一些错误类型的例子：
         * 1. 参照错误（ReferenceError）：当尝试使用尚未声明的变量时。
         * 2. 引用错误（TypeError）：当尝试使用非引用类型的值时。
         * 3. 语法错误（SyntaxError）：当语法错误导致代码无法被执行时。
         * 4. 运行时错误（RangeError）：当超出范围时。new Array(-1);指定数组长度为负数。new Array传入单个值为指定数组的长度。
         * 5. 运行时错误（TypeError）：当操作类型不匹配时。
         * 6. 运行时错误（EvalError）：当 eval() 函数被使用不当时。
         * 7. 运行时错误（URIError）：当 URI 相关操作出错时。
         * 8. 运行时错误（InternalError）：当 JavaScript 引擎内部错误时。
         */


        // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
        try {
            // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
            // 这里有一个致命的错误,getUerInfo({ user_name:""}),user_name为""空时,依然可以操作成功
            // 因此前面添加了一个判断用户名或密码不能为空的中间件,还添加了一个查找数据库的中间件
            const { password, ...res } = await getUerInfo({ user_name: username })
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    //颁发token,给用户临时授权
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                },
            }
        } catch (err) {
            console.error('用户登录失败111', err)
        }
    }

}

module.exports = new UserController()
