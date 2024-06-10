const { sequelize, User, } = require('./Sequelize/1_数据库连接');
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


    const projects = await sequelize.query('SELECT * FROM users WHERE name IN($status1)',
        {
            bind: { status: '小李', status1: '小张' },
            type: QueryTypes.SELECT
        });
    // const filteredProjects = projects.filter(project => project.name.includes('小'));


    console.log(JSON.stringify(projects, null, 2));






}
aa()





























//--------------------------------------------------------------------------------//

app.listen(3000, () => {
    console.log('server is running at port 3000')
})

