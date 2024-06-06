const { Sequelize, DataTypes } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test2', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql'
});

// 创建数据库
async function createDatabase() {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS test2;', { type: sequelize.QueryTypes.RAW });
        console.log('Database created successfully.');
    } catch (error) {
        console.error('Error creating database:', error);
    }
}

createDatabase();