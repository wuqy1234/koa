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
        allowNull: true,
        // validate: {
        //     isIn: ['foo', 'bar']
        // }
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
            },
            // min: 18,
            // max: 30
            isInt: {
                msg: "必须是整数"
            }
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

const Students = sequelize.define("Students", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Profile = sequelize.define("Profile", {
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            equals: [['foo', 'bar']]
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

// const Classroom = sequelize.define("Classroom", {
//     bio: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     }

// })

Students.belongsToMany(Profile, {
    through: 'middleTable', // 中间表的名称
    as: 'Profile', // 这将允许我们使用 user.getProjects() 方法
    foreignKey: 'userId'
});

// Project belongs to many Users
Profile.belongsToMany(Students, {
    through: 'middleTable', // 中间表的名称
    as: 'students', // 这将允许我们使用 project.getUsers() 方法
    foreignKey: 'projectId'
});

class Person extends Model { }
Person.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('name');

            return rawValue ? rawValue.toUpperCase() : null;
        }
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.name;

            return rawValue ? rawValue.toUpperCase() : null;
        }
    }
}, {
    sequelize,
    modelName: 'Person'
});

class Mail extends Model { }

Mail.init({
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Mail'
});

//这样能通过姓名找到发送的邮件或接收的邮件,或者发送和接收的都有,通过关联,个人下面有两个表
//在个人下面有两个关联表,表名sentMails和receivedMails,即别名sentMails和receivedMails.
Person.hasMany(Mail, { as: 'sentMails', foreignKey: 'senderId' });
Person.hasMany(Mail, { as: 'receivedMails', foreignKey: 'receiverId' });

//这样能通过邮件找到发送者和接收者,通过关联,邮件下面有两个表
//在邮件下面有两个关联表,表名sender和receiver,即别名sender和receiver,外键的作用就是把两个表关联起来
Mail.belongsTo(Person, { as: 'sender', foreignKey: 'senderId' });
Mail.belongsTo(Person, { as: 'receiver', foreignKey: 'receiverId' });



class Product extends Model { }
Product.init({
    title: Sequelize.STRING
}, { sequelize, modelName: 'product' });

class UserOne extends Model { }
UserOne.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
}, { sequelize, modelName: 'userOne' });

class Address extends Model { }
Address.init({
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });

Product.UserOne = Product.belongsTo(UserOne, { as: 'userOne_1' });
UserOne.Addresses = UserOne.hasMany(Address, { as: 'addresses_1' });







console.log(
    Product.UserOne,
    UserOne.Addresses,
    Product.belongsTo(UserOne),
    UserOne.hasMany(Address),
    Person.hasMany(Mail),
    Mail.belongsTo(Person, { through: 'middleTable', }),
    // Profile.belongsToMany(Students),
    'mmmmmmmmmmmmmm');



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
    Students,
    Profile,
    Person,
    Mail,
    sequelize,
    Product,
    UserOne,
    Address
}