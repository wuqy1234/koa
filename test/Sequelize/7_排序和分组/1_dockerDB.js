const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,

});

class Subtask extends Model { }
Subtask.init({
    num: DataTypes.INTEGER,
    age: DataTypes.INTEGER
}, { sequelize, modelName: 'Subtask', timestamps: false })

class Product extends Model { }
Product.init({
    title: Sequelize.STRING,
    num: DataTypes.INTEGER
}, { sequelize, modelName: 'product', timestamps: false });

Subtask.hasOne(Product, { foreignKey: 'productId' });

// 同步模型到数据库，创建表
(async () => {
    try {
        await sequelize.sync({ alter: true }); // force alter
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();



(async () => {
    let i = 0;
    // while (true) {
    //     const num = await Subtask.create({
    //         num: Math.floor(Math.random() * 100),
    //         age: Math.floor(Math.random() * 100)
    //     });
    //    await Product.create({
    //         title: "hello", productId: num.id,
    //         num: Math.floor(Math.random() * 100) })

    //     console.log(Math.floor(Math.random() * 100));
    //     i++;
    //     if (i == 10) break;
    // }


    // const aa = await Subtask.findAll({
    //     include: [{
    //         model: Product,
    //         attributes: ["num"],
    //     }],
    //     order: [
    //     [Product, 'num', 'DESC']
    // ]
    // })

    // const aa = await Subtask.findAll({
    //     attributes: [
    //         'num', 
    //         [sequelize.fn('COUNT', sequelize.col('*')), 'count']
    //     ],
    //     group: ['num']//只会把相同的num进行分组
    // })

    // const aa1 = await Subtask.findAll({
    //     attributes: [
    //         [sequelize.fn('MAX', sequelize.col('age')), 'maxAge']
    //     ]
    // });



    console.log(JSON.stringify(aa, null, 2));
})();



module.exports = {


};

