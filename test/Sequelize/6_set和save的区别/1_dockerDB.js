const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});



// 同步模型到数据库，创建表
(async () => {
    try {
        await sequelize.sync({ alter: true }); // force: true
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();

(async () => { 
    // const jane = await User.create({ name: "Jane", age :12});
    // console.log(jane.name); // "Jane"
    // jane.name = "Ada12";
    // // 数据库中的名称仍然是 "Jane"
    // await jane.save();
    // 现在该名称已在数据库中更新为 "Ada"！

    // const jane = await User.create({ name: "Jane", age: 12 });

    // jane.set({
    //     name: "Ada12",
    //     favoriteColor: "blue"
    // });
    // // 如上, 数据库中还是 "Jane" 和 "green"
    // await jane.save();

    // const jane = await User.create({ name: "Jane", age: 12 });
    // jane.favoriteColor = "blue"
    // await jane.update({ name: "Ada123" })
    // // 数据库现在将 "Ada" 作为 name，但仍然有默认的 "green" 作为 favoriteColor
    // await jane.save()
    // // 数据库现在将 "Ada" 作为 name，但仍然有默认的 "blue" 作为 favoriteColor

})();

//综上:两者的作用是一样的,updata只更新单个字段,save更新所有字段
//await jane.save({ fields: ['name'] });这样就和updata差不多了
//以下只有username字段被插入
//const user = await User.create({
// username: 'alice123',
//     isAdmin: true
// }, { fields: ['username'] });


module.exports = {


};

