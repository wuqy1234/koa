const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});


class Foo extends Model { }
Foo.init({
    uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
    uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    someUnique: { type: DataTypes.STRING, unique: true },

}, {
    sequelize,
    modelName: 'foo',

    // 在上面的属性中使用 `unique: true` 与在模型的indexes参数中创建索引完全相同,
    //二者取其一就行,两者兼有页没事,只不过是重复了而已
    indexes: [{ unique: true, fields: ['someUnique'] }]
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

(async () => {
    const aa = await Foo.create({
        uniqueOne: 'one21',
        uniqueTwo: 112,
        someUnique: 'nih111qa',
    })
})()



module.exports = {


};

