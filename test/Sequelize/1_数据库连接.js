const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

const sequelize = new Sequelize('hello', 'root1', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    timezone: '+08:00'
});


sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log('数据库连接失败', err)
    })

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            max(value) {
                if (value > 30 || value < 18) {
                    throw new Error('年龄不在范围内');
                }
            }
            // min: 18,
            // max: 30
        }
    },
    cash: DataTypes.INTEGER,
    fullContent: {
        type: DataTypes.VIRTUAL,
        get() {
            return `id:${this.id},姓名:${this.name}, 年龄:${this.age},爱好颜色:${this.favoriteColor},现金:${this.cash}`;
        },
        set(value) {
            throw new Error('不要尝试设置 `fullName` 的值!');
        }
    }
});



(async () => {
    try {
        await sequelize.sync({ alter: true }); // 如果表已存在，则根据模型修改表结构
        console.log('表创建成功');
    } catch (error) {
        console.error('创建表时出错:', error);
    }
})();




























module.exports = {
    sequelize,
    User
}