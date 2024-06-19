const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});
class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true

    }
}, {
    sequelize
})

class Project extends Model { }
Project.init({
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    someNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
    {
        defaultScope: {
            where: {
                active: true
            }
        },
        scopes: {
            deleted: {
                where: {
                    deleted: true
                }
            },
            activeUsers: {
                include: [
                    { model: User, as: 'users', where: { active: true } }
                ]
            },
            random() {
                return {
                    where: {
                        someNumber: Math.floor(Math.random() * 10)
                    }
                }
            },
            accessLevel(value) {
                return {
                    where: {
                        accessLevel: {
                            [Op.gte]: value
                        }
                    }
                }
            },
        },
        sequelize
    });

Project.hasOne(User, {
    foreignKey: 'projectId',
    as: 'users'
});

console.log(Math.floor(Math.random() * 10));

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
    // const aa = await User.bulkBuild([
    //     { firstName: 'Bob', lastName: 'Hancock' },
    //     { firstName: 'Rose', lastName: 'Doe' },
    //     { firstName: 'Jim', lastName: 'Schmoe' },
    //     { firstName: 'Elyx', lastName: 'Bob' },
    //     { firstName: 'Alice', lastName: 'Doe' },
    // ])

    // console.log(JSON.stringify(aa, null, 2));

    // const bb = await Project.bulkCreate([
    //     { name: 'Project 6', accessLevel: 1, someNumber: 1 },
    //     { name: 'Project 7', accessLevel: 2, someNumber: 2, active: false },
    //     { name: 'Project 8', accessLevel: 3, someNumber: 3 },
    //     { name: 'Project 9', accessLevel: 4, someNumber: 4, active: false },
    //     { name: 'Project 10', accessLevel: 5, someNumber: 5 },])
    // console.log(JSON.stringify(bb, null, 2));

    // for (let i = 0; i < 5; i++) {
    //     const id = bb[i].id;
    //     Object.assign(aa[i], { projectId: id })
    //     console.log(JSON.stringify(aa[i], null, 2), '1111111111111');
    //     aa[i].save()
    // }
    // const find = await Project.scope('activeUsers').findAll()
    // console.log(JSON.stringify(find, null, 2));


    const t1 = await sequelize.transaction();
    const t2 = await sequelize.transaction();

    try {
        const result1 = await User.findAll({
            limit: 1,
            lock: true,
            transaction: t1
        });
        console.log(JSON.stringify(result1, null, 2))
        result1[0].active = false
        await result1[0].save({ transaction: t1 });
        await t1.commit();

        // 在事务 t2 中跳过锁定的行
        //这个函数一直在等待,所以下面的事务无法提交,t1.commit()和t2.commit()无法提交,
        //所以上面的函数无法执行,result1[0].save({ transaction: t1 })
        const result2 = await User.findAll({
            limit: 6,
            lock: true,
            skipLocked: true,
            transaction: t2
        });
        console.log(JSON.stringify(result2, null, 2))
        // await t1.commit();//注释掉,否则上面的 result1[0].save({ transaction: t1 })无法保存到数据库
        await t2.commit();

    } catch (error) {
        await t1.rollback();
        await t2.rollback();
        console.error('Transaction error:', error);
    }
})();



module.exports = {


};

