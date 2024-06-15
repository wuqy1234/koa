const { Sequelize, DataTypes, Model, attributes, Op, where } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

const Bar = sequelize.define('bar', {
    name: DataTypes.STRING
});

const Foo = sequelize.define('foo', {
    name: DataTypes.STRING,
    barId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "bars", // 目标表
            key: "id"      // 目标字段
        },
        onDelete: "CASCADE" // 级联删除
    },
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

    // 创建一个 Bar 实例
    // const newBar = await Bar.create({ name: 'Example Bar' });

    // // 创建一个 Foo 实例，并将 barId 设置为新创建的 Bar 实例的 id
    // const newFoo = await Foo.create({ name: 'Example Foo', barId: newBar.id });


    // const aa=await Foo.findAll({
    //     attributes:['barId']
    // });

    // console.log(JSON.stringify(aa,null,2));

    // 删除 Bar 实例，关联的 Foo 实例也会被自动删除
    // await Bar.destroy({
    //    where: {
    //        id: [1,2]
    //    }
    // });

    const allFoos = await Foo.findAll();
    console.log(JSON.stringify(allFoos, null, 2)); 
})();

module.exports = {


};

