const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const router = new Router({ prefix: '/user' })
const {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    auth,
    SensitiveWords,
    upFile
} = require('../middleware/user.middleware');

/**
 * 注册接口
 */
// GET /users/
/**
 * !如果用户名和密码这样的敏感信息通过URL参数（即`ctx.params`）传递，
 * !这是不安全的，因为URL可能会被记录在浏览器历史、服务器日志或通过referer头泄露。
 * !正确的做法是始终使用POST请求的请求体来传递这类数据。
 * *在微信小程序中wx.cloud.callContainer,
 * *get请求方法是通过params传送数据的,post是通过body传送数据的。
*/
router.post('/register', userValidator, SensitiveWords, verifyUser, crpytPassword, register)
//预先颁发了token,不像之前自己设计的,只有登录成功了在颁发token,可以改造login接口,在其后面添加await next方法
router.post('/login', userValidator, verifyLogin, login)

// ?修改密码接口,除了get,post,delete,put等方法，还有patch,等等20个请求方法
router.patch('/', auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '修改密码成功'
})


router.patch('/test', (ctx, next) => {

    ctx.body = { msg: "你好,这是一个测试,微信小程序后台1111" };

})

module.exports = router