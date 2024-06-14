const {
    User,
    Profile,
    Students,
    Person,
    Mail,
    Product,
    UserOne,
    Address
} = require('./Sequelize/1_数据库连接');
const { Op, QueryTypes } = require("sequelize");
const koa = require('koa');
const app = new koa();
const Router = require('koa-router')
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'hello world'
})
app.use(router.routes())

//------------------------------------------------------------------------------------//

const aa = async (params) => {







};


aa()





























//--------------------------------------------------------------------------------//

app.listen(3000, () => {
    console.log('server is running at port 3000')
})

