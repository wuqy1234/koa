const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});





// 同步模型到数据库，创建表
(async () => {
    try {
        await sequelize.sync({ alter: true }); // 如果表已存在，则根据模型修改表结构
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();

module.exports = {


};

