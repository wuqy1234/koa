const { sequelize, User } = require('./Sequelize/1_数据库连接');
const koa = require('koa');
const app = new koa();
const Router = require('koa-router')
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'hello world'
})
app.use(router.routes())

//-------------------------------------------------------------------------------------//

const aa = async (params) => {
    const jane = User.build({ name: "小张", favoriteColor: 'black', age: 6, cash: 50 });


    jane.favoriteColor = "blue"
    jane.name = '小李'
    await jane.save();


    console.log(jane.toJSON());


}

aa()





























//--------------------------------------------------------------------------------//

app.listen(3000, () => {
    console.log('server is running at port 3000')
})

