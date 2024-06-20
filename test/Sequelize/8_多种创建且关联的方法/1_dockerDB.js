const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});


class Product extends Model { }
Product.init({
    title: Sequelize.STRING
}, { sequelize, modelName: 'product' });
class User extends Model { }
User.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
}, { sequelize, modelName: 'user' });
class Address extends Model { }
Address.init({
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });

// 我们保存关联设置调用的返回值,以便以后使用
Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
// 也适用于 `hasOne`

console.log(
    Product.User,
    User.Addresses);

// 同步模型到数据库，创建表
(async () => {
    try {
        await sequelize.sync({ alter: true }); // force  alter
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();



(async () => {
    //第一种方法
    // await  Product.create({
    //     title: 'Chair',
    //     user: {
    //         firstName: 'Mick',
    //         lastName: 'Broadstone',
    //         addresses: [{
    //             type: 'home',
    //             line1: '100 Main St.',
    //             city: 'Austin',
    //             state: 'TX',
    //             zip: '78704'
    //         }]
    //     }
    // }, {
    //     include: [{
    //  association: 'user', include: 'addresses',直接填关联表在主表中的属性名称也是可以的
    //         association: Product.User,
    //         include: [User.Addresses] 
    //     }]
    // });

    //第二种方法
    // const user = await User.create({
    //     firstName: 'Mick',
    //     lastName: 'Broadstone',
    // })
    // const product = await Product.create({
    //     title: 'Chair', userId: user.id
    // })
    // const addresses = await Address.create({
    //     type: 'home',
    //     line1: '100 Main St.',
    //     city: 'Austin',
    //     state: 'TX',
    //     zip: '78704',
    //     userId: user.id
    // })

    //第三种方法foo.createBar()

    const user = await User.create({
        firstName: 'Mick11111111',
        lastName: 'Broadstone',
    })
    //Product和user关联了,user没有和Product关联,所以会出错
    // await user.createProduct({
    //     title: 'Chair', userId: user.id
    // });

    //修正后:
    const product = await Product.create({
        title: 'Chair11111', userId: user.id
    })
    
    await user.createAddress({
        type: 'home111111111',
        line1: '100 Main St.',
        city: 'Austin',
        state: 'TX',
        zip: '78704',
        userId: user.id
    });



    //     const users = await User.findAll({
    //         include: Address
    //     })
    //     console.log(JSON.stringify(users, null, 2));
    })();



    module.exports = {


    };

