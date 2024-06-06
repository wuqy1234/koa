const { Sequelize, DataTypes } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    port: 89, 
    dialect: 'mysql'
});

// 定义 User 模型
const User = sequelize.define('User', {
    // 属性
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // 其他模型选项
    timestamps: true, // 自动添加createdAt和updatedAt字段
    tableName: 'users2222' // 指定表名
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