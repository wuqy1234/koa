const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

// 定义 Post 模型
class Post extends Model { }
Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
}, { sequelize, modelName: 'post' });

// 定义 Image 模型
class Image extends Model { }
Image.init({
    url: DataTypes.STRING
}, { sequelize, modelName: 'image' });

// 定义 Comment 模型
class Comment extends Model { }
Comment.init({
    content: DataTypes.TEXT,
    commentableType: DataTypes.STRING,
    commentableId: DataTypes.INTEGER
}, { sequelize, modelName: 'comment' });

// 设置多态关联
Post.hasMany(Comment, { foreignKey: 'commentableId', constraints: false, scope: { commentableType: 'post' } });
Image.hasMany(Comment, { foreignKey: 'commentableId', constraints: false, scope: { commentableType: 'image' } });

Comment.belongsTo(Post, { foreignKey: 'commentableId', constraints: false });
Comment.belongsTo(Image, { foreignKey: 'commentableId', constraints: false });





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
    Post,
    Image,
    Comment
};

