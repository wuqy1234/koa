const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('hello', 'root1', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
});


sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log('数据库连接失败', err)
    })

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});



(async () => {
    try {
        await sequelize.sync({ alter: true }); // 如果表已存在，则根据模型修改表结构
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();




























module.exports = {
    sequelize,
    User}