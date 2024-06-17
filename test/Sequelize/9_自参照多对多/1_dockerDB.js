const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});


const Person = sequelize.define('Person', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 其他字段...
});

//废弃
// const PersonRelationships = sequelize.define('PersonRelationships', {
//     childId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Person, // 关联的表名
//             key: 'id'
//         }
//     },
//     parentId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Person, // 关联的表名
//             key: 'id'
//         }
//     },
//     grandparentId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Person, // 关联的表名
//             key: 'id'
//         }
//     },
//     grandsonId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Person, // 关联的表名
//             key: 'id'
//         }
//     }
// }, {
//     timestamps: false,
//     indexes: [
//         {
//             unique: true,
//             fields: ['childId', 'parentId']
//         },
//         {
//             unique: true,
//             fields: ['grandparentId', 'grandsonId']
//         }
//     ]
// });
//废弃


// 自参照多对多关系定义
Person.belongsToMany(Person, {
    as: 'Parents', // 这里定义了“父母”的关系别名
    through: 'PersonRelationships', // 联结表
    foreignKey: 'childId', // 当前Person作为孩子时的外键
    otherKey: 'parentId', // 与之关联的Person作为父母时的外键
});

Person.belongsToMany(Person, {
    as: 'Children', // 这里定义了“孩子”的关系别名
    through: 'PersonRelationships', // 同一个联结表
    foreignKey: 'parentId', // 当前Person作为父母时的外键
    otherKey: 'childId', // 与之关联的Person作为孩子时的外键
});

//废弃
// Person.belongsToMany(Person, {
//     as: 'Grandparents',
//     through: PersonRelationships,
//     foreignKey: 'grandparentId',
//     otherKey: 'grandsonId',
// });
// Person.belongsToMany(Person, {
//     as: 'Grandsons',
//     through: PersonRelationships,
//     foreignKey:'grandsonId' ,
//     otherKey:'grandparentId',
// });
//废弃


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
    // const johndad = await Person.create({ name: 'John dad' });
    // const johnmon = await Person.create({ name: 'John mon' });
    // const john = await Person.create({ name: 'John Doe' });
    // const jane = await Person.create({ name: 'Jane Doe' });
    // const mike = await Person.create({ name: 'Mike Smith' });
    // const miji = await Person.create({ name: 'Miji Smith' });
    // const mikeson = await Person.create({ name: 'Mike Son' });

    // // 使用“孩子”关系别名将 Mike 添加为 John 的孩子
    // await john.addChildren(mike);

    // // 使用“父母”关系别名将 Jane 添加为 Mike 的母亲（即 Mike 的父母之一）
    // await mike.addParents(jane);
    // await miji.addParents([jane,john]);

    // await mikeson.addParents(mike);
    // // 查询 John 的所有孩子
    // const johnsChildren = await john.getChildren();
    // console.log("John's children:", johnsChildren.map(child => child.name));

    // // 查询 Mike 的所有父母
    // const mikesParents = await mike.getParents();
    // console.log("Mike's parents:", mikesParents.map(parent => parent.name));

    // await john.addParents([johndad, johnmon]);


    //废弃
    // await mike.addGrandparents([johndad, johnmon]);
    // await mikeson.addGrandparents([john, jane]);
    //废弃


    // const aa = await Person.findAll({
    //     include: [
    //         {
    //             model: Person,
    //             as: 'Children', // 使用“孩子”关系别名
    //             attributes: ['name'],
    //             through: {
    //                 attributes: [], // 不返回联结表的字段
    //             },
    //         },
    //         {
    //             model: Person,
    //             as: 'Parents', // 使用“父母”关系别名
    //             attributes: ['name'],
    //             through: {
    //                 attributes: [], // 不返回联结表的字段
    //             },
    //         },
    //     ],

    //     //  include: { all: true, nested: true } // 递归查询所有关联关系
    // });


    //     const aa = await Person.findAll({
    //         where: {
    //             //通过名字查询,就能获取此人的父母和孩子的信息,
    //             //再利用此人的父母的名字查询,就能往上查询;利用此人的孩子的名字就能往下查询;
    //             name: 'John Doe',
    //         },
    //         include: [
    //             {
    //                 model: Person,
    //                 as: 'Children', // 使用“孩子”关系别名
    //                 attributes: ['name'],
    //                 through: {
    //                     attributes: [], // 不返回联结表的字段
    //                 },
    //             },
    //             {
    //                 model: Person,
    //                 as: 'Parents', // 使用“父母”关系别名
    //                 attributes: ['name'],
    //                 through: {
    //                     attributes: [], // 不返回联结表的字段
    //                 },
    //             },
    //         ],
    //     });
    //  console.log(JSON.stringify(aa, null, 2));



    let grandchildrenResult = await getGrandchildren('John dad', 2)
    console.log(grandchildrenResult, 'aaaaaaaaaaaaaaaaaa');

    let grandchildrenResult_tylm = await getGrandchildren_tylm('John dad', 4, 4)
    console.log(grandchildrenResult_tylm, 'bbbbbbbbbbbbbbbbbb');
})();


// async function getGrandchildren(name) {
//     const son = await Person.findAll({
//         where: { name },
//         include: {
//             model: Person,
//             as: 'Children', // 使用“孩子”关系别名
//             attributes: ['name'],
//             through: {
//                 attributes: [], // 不返回联结表的字段
//             }
//         }
//     })
//     const childrens = son[0].Children;
//     let myson = [];
//     for (const child of childrens) {
//         // myson = myson.concat(child);和push的作用一样,不过是不断在改变数组 let myson = []
//         myson.push(child.name)
//     }
//     let getChildren = [];
//     for (const child of myson) {
//         const grandson = await Person.findAll({
//             where: { name: child },
//             include: {
//                 model: Person,
//                 as: 'Children', // 使用“孩子”关系别名
//                 attributes: ['name'],
//                 through: {
//                     attributes: [], // 不返回联结表的字段
//                 }
//             }
//         })
//         const grandsonChildrens = grandson[0].Children; 
//         for (const grandsonChild of grandsonChildrens) {
//             getChildren.push(grandsonChild.name)
//         }
//     }
//     console.log(JSON.stringify(getChildren, null, 2));
//     return getChildren
// }


//递归优化
async function getGrandchildren(name, n) {
    let Grandchildrens = [];
    let Grandchildrens_log = [];
    async function getChildren(name, n = 1) {
        const sons = await Person.findAll({
            where: { name },
            include: {
                model: Person,
                as: 'Children',
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        const childrenNames = sons[0].Children.map(child => child.name);
        if (sons.length > 0) {
            await Promise.all(
                childrenNames.map(async childName => {
                    await getChildren(childName, n - 1);
                    Grandchildrens_log = Grandchildrens_log.concat(childName);
                    if (n == 1) {
                        Grandchildrens = Grandchildrens.concat(childrenNames)
                    }
                    console.log(n,'wwwwwwwwwwwww');
                }))
        }

    }
    await getChildren(name, n);
    return { Grandchildrens, Grandchildrens_log }
}


async function getGrandchildren_tylm(name, depth, n) {
    let grandchildren = [];

    async function getChildren(name, depth) {
        if (depth === 0) return; // 递归终止条件

        const sons = await Person.findAll({
            where: { name },
            include: {
                model: Person,
                as: 'Children',
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        if (sons.length > 0) {
            const childrenNames = sons[0].Children.map(child => child.name);

            // 确保等待所有子任务完成
            await Promise.all(
                childrenNames.map(async childName => {
                    const subGrandchildren = await getChildren(childName, depth - 1);
                    grandchildren = grandchildren.concat(subGrandchildren || []); // 如果子任务返回null或undefined，则忽略
                })
            );

            // 首次进入此函数层级时，添加当前层级的孩子们
            if (depth === n) {
                grandchildren = grandchildren.concat(childrenNames);
            }
        }
    }

    await getChildren(name, depth);
    return grandchildren;
}


module.exports = {


};

