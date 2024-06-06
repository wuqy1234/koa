const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const router = new Router({ prefix: '/user' })
const {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    auth,
    SensitiveWords
} = require('../middleware/user.middleware');

/**
 * 注册接口
 */
// GET /users/
router.get('/register', userValidator, SensitiveWords, verifyUser, crpytPassword, register)
//预先颁发了token,不像之前自己设计的,只有登录成功了在颁发token,可以改造login接口,在其后面添加await next方法
router.get('/login', userValidator, verifyLogin, login)

// 修改密码接口,除了get,post,delete,put等方法，还有patch,等等20个请求方法
router.patch('/', auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '修改密码成功'
})

module.exports = router