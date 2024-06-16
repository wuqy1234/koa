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
    //使用关联模型的名字进行排序
    //     [Product, 'num', 'DESC']
    // ]
    // })

    // const aa1 = await Subtask.findAll({
    //     include: [{
    //         model: Product,
    //         attributes: ["num"],
    //     }],
    //     order: [
    //使用关联模型的在主模型字段里的名称进行排序,首字母小写product,加引号
    //         ['product', 'num', 'DESC'],
    //     ]
    // });

    // const aa1 = await Subtask.findAll({
    //     include: [{
    //         model: Product,
    //         attributes: ["num"],
    //     }],
    //     order: [
    // 使用关联模型的名字进行排序
    //         [{ model: Product }, 'num', 'DESC'],
    //     ]
    // });

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

    // const aa1 = await Subtask.findAll({
    //     // attributes: ['age'],
    //     attributes:{
    //         exclude: ["id", "num"]
    //     },
    //     order: [
    //         [sequelize.col('age'), 'DESC']
    //     ],
    //     limit: 1  // 如果你只想要找到age最大的那一条记录，可以使用limit限制结果数量
    // });

    //   const aa1 = await Subtask.findOne({
    //       attributes: ['age'],
    //       order: [
    //               [sequelize.col('age'), 'DESC']
    //           ],
    //     });


    // const aa1 = await Subtask.findOne({
    //     attributes: ['age'],
    //     order: [
    //         ['age', 'DESC']
    //     ],
    // });

    // const aa1 = await Subtask.max('age');
    // const aa1 = await Subtask.min('age');
    // const aa1 = await Subtask.sum('age');
    //在小于20的范围内找最大值
    // const aa1 = await Subtask.max('age', { where: { age: { [Op.lt]: 20 } } });
    //在大于20的范围内找最大值
    // const aa1 = await Subtask.min('age', { where: { age: { [Op.gt]: 20 } } });
    //在大于20的范围内求和
    // const aa1 = await Subtask.sum('age', { where: { age: { [Op.gt]: 20 } } });

    // const aa1 = await Subtask.count({
    //     attributes: 'age',
    // });
    //找到id为1的age加5
    // aa1 = await Subtask.increment({ age: 5 }, { where: { id: 1 } })
    //找到id为1的age减5
    // aa1 = await Subtask.increment({age: -5}, { where: { id: 1 } })
    // aa1 = await Subtask.decrement({age: 5}, { where: { id: 1 } })





    const aa = await Subtask.findAll({
        attributes: [],
       
        include: [{
            // attributes: ['num'],
            model: Product,
            where: {
                num: { [Op.eq]: 56 }
            },
        }],
    })

    console.log(JSON.stringify(aa, null, 2));
})();



module.exports = {


};

