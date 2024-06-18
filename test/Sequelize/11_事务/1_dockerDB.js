const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test2', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

// const t = await sequelize.transaction();

// class User extends Model { }
// User.init({
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })
// class Sibling extends Model { }
// Sibling.init({
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

// User.hasOne(Sibling);


    // 同步模型到数据库，创建表
  
  
  
const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false
});

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fromAccountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    toAccountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false
});




  
  
    (async () => {
        try {
            await sequelize.sync({ alter: true }); // force  alter
            console.log('表创建成功');
        } catch (error) {
            console.error('创建表时出错:', error);
        }
    })();



(async () => {
    // try {
    //     const user = await User.create({
    //         firstName: 'Bart',
    //         lastName: 'Simpson'
    //     }, { transaction: t });

    //     await user.addSibling({
    //         firstName: 'Lisa',
    //         lastName: 'Simpson'
    //     }, { transaction: t });

    //     await t.commit();

    // } catch (error) {
    //     await t.rollback();

    // }
    async function transferMoney(transactionDetails) {
        try {
            // 开始事务
            const t = await sequelize.transaction();

            // 尝试从转出账户扣款
            const fromAccount = await Account.findByPk(transactionDetails.fromAccountId);
            if (!fromAccount || fromAccount.balance < transactionDetails.amount) {
                throw new Error("Insufficient balance or account not found.");
            }
            fromAccount.balance -= transactionDetails.amount;
            await fromAccount.save({ transaction: t });

            // 尝试向转入账户加款
            const toAccount = await Account.findByPk(transactionDetails.toAccountId);
            toAccount.balance += transactionDetails.amount;
            await toAccount.save({ transaction: t });

            // 记录交易
            await Transaction.create({
                fromAccountId: transactionDetails.fromAccountId,
                toAccountId: transactionDetails.toAccountId,
                amount: transactionDetails.amount
            }, { transaction: t });

            // 如果一切顺利，提交事务
            await t.commit();
            console.log("Transaction completed successfully.");
        } catch (error) {
            // 如果有任何错误，回滚事务
            await t.rollback();
            console.error("Transaction failed. Rolling back:", error.message);
        }
    }

    // 示例转账操作
    const transferDetails = {
        fromAccountId: 1,
        toAccountId: 2,
        amount: 100.00
    };

    transferMoney(transferDetails).catch(console.error);




})();



module.exports = {


};

