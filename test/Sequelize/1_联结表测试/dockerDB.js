const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

// 定义 User 模型
// const User = sequelize.define('User', {
//     // 属性
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     // // 其他模型选项
//     // timestamps: true, // 自动添加createdAt和updatedAt字段
//     // tableName: 'users2222' // 指定表名
// });


const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        // unique: 'compositeIndex' // 定义唯一约束
    },
    email: {
        type: DataTypes.STRING,
        // unique: true // 定义唯一约束

    },
    points: DataTypes.INTEGER
},
    {
        timestamps: false,
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['username', 'email']
        //     }
        // ]

    });
const Profile = sequelize.define('profile', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
}, { timestamps: false });

// const User_Profile = sequelize.define('User_Profile', {
//     selfGranted: DataTypes.BOOLEAN,
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
// }, { timestamps: false });

const Grant = sequelize.define('grant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });


User.belongsToMany(Profile, { through: Grant });
Profile.belongsToMany(User, { through: Grant });

// 在 User 和 Grant 之间设置一对多关系
// User.hasMany(Grant);
// Grant.belongsTo(User);

// 在Profile 和 Grant 之间也设置一对多关系
// Profile.hasMany(Grant);
// Grant.belongsTo(Profile);

// User.Profile = User.belongsToMany(Profile, { through: User_Profile });

// Profile.User = Profile.belongsToMany(User, { through: User_Profile});

console.log(User.hasMany(Grant), Profile.hasMany(Grant), 'mmmmmmmmmmmmmmmm');







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
    User,
    Profile,
    // User_Profile,
    Grant

};

