const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
Sequelize.useCLS(namespace);
// 初始化 Sequelize 实例
const sequelize = new Sequelize('test2', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});



class User extends Model { }
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize });

class Profile extends Model { }
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bio: DataTypes.STRING
}, { sequelize });

User.hasOne(Profile);

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

    try {

        const result = await sequelize.transaction(async (t) => {
            // console.log(t,'tttttttttttttttttttt');
            const user = await User.create({
                username: 'John',
                birthday: new Date(1980, 6, 20)
            });

            const profile = await Profile.create({
                UserId: user.id,
                bio: 'This is Johns profile'
            });
            // throw new Error();
        });
    } catch (error) {


    }

    const aa = await User.findAll({
        attributes: ['id', 'username', 'birthday'],
        include: {
            model: Profile,
            attributes: ['bio']
        }
    });
    console.log(JSON.stringify(aa, null, 4));

})();



module.exports = {


};

