const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test1', 'root', '123456', {
    host: 'localhost',
    port: 89,
    dialect: 'mysql',
    logging: false,
});

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;


class Image extends Model { }
Image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
}, { sequelize, modelName: 'image' });

class Video extends Model { }
Video.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING
}, { sequelize, modelName: 'video' });

class Comment extends Model {
    getCommentable(options) {
        if (!this.commentableType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
        return this[mixinMethodName](options);
    }
}
Comment.init({
    title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING
}, { sequelize, modelName: 'comment' });

const image = Image.hasMany(Comment, {
    foreignKey: 'commentableId',//指定为外键,id会变成主键
    constraints: false,
    scope: {
        commentableType: 'image'
    }
});

const commentImage = Comment.belongsTo(Image, { foreignKey: 'commentableId', constraints: false });

const video = Video.hasMany(Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'video'
    }
});
const commentVideo = Comment.belongsTo(Video, { foreignKey: 'commentableId', constraints: false });


Comment.addHook("afterFind", findResult => {
    // console.log(JSON.stringify(findResult, null, 2), 'fffffffffffffff');
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
        // console.log(JSON.stringify(instance, null, 2), 'vvvvvvvvvvvvvvv');
        if (instance.commentableType === "image" && instance.image !== undefined) {
            instance.commentable = instance.image;
            // console.log(JSON.stringify( instance.commentable, null, 2), 'iiiiiiiiiiiiiiii');
        } else if (instance.commentableType === "video" && instance.video !== undefined) {
            instance.commentable = instance.video;
            // console.log(JSON.stringify(instance.commentable, null, 2), 'vvvvvvvvvvvvvvvvvv');
        }
        // 防止错误:
        delete instance.image;
        delete instance.dataValues.image;
        delete instance.video;
        delete instance.dataValues.video;
    }
});


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

    // const image = await Image.create({
    //     title: 'Image 1',
    //     url: 'https://example.com/image1.jpg',
    //     comments: [
    //         {
    //             title: 'Comment 1',
    //             commentableType: 'image',
    //         },
    //         {
    //             title: 'Comment 2',
    //             commentableType: 'image',
    //         }
    //     ]
    // }, {
    //     include: Comment
    // });
    // const video = await Video.create({
    //     title: 'Video 1',
    //     text: 'Video 1 text',
    //     comments: [
    //         {
    //             title: 'Comment 1',
    //             commentableType: 'video',
    //         },
    //         {
    //             title: 'Comment 2',
    //             commentableType: 'video',
    //         }
    //     ]
    // }, {
    //     include: Comment
    // });

    //反过来创建却不行
    // const comment = await Comment.create({
    //     title: 'Comment 11',
    //     commentableType: 'image',
    //     images: [
    //         {
    //             title: 'Image 11',
    //             url: 'https://example.com/image1.jpg',
    //         },
    //         {
    //             title: 'Image 12',
    //             url: 'https://example.com/image2.jpg',
    //         }
    //     ],
    //     videos: [
    //         {
    //             title: 'Video 11',
    //             text: 'Video 11 text',
    //         },
    //         {
    //             title: 'Video 12',
    //             text: 'Video 12 text',
    //         }
    //     ]
    // },
    //     {
    //         include: [
    //             Image,
    //             Video
    //         ]
    //     });


    // const bb = await Comment.findAll({
    //     include:{
    //         model: video
    //     }
    // })
    // console.log(JSON.stringify(bb.commentable, null, 2));



    // const image = await Image.create({ url: "https://placekitten.com/408/287" });
    // const comment = await image.createComment({ content: "Awesome!" });

    // console.log(comment.commentableId === image.id);

    // console.log(comment.commentableType);
    // const associatedCommentable = await comment.getCommentable();
    // // const associatedCommentable = await comment.getImage();
    // console.log(JSON.stringify(associatedCommentable, null, 2));

    const aa = await Comment.findOne({
        where: {
            id: 2
        },
        include: [Image, Video]
    })
    //按说使用了include: [Image,Video],关联的模型应该会自动加载，
    //但是没有,因为被钩子函数删除了,同时把[Image,Video]信息存到了Commentable中了。
    // console.log(JSON.stringify(aa, null, 2), 'pppppppppppppppp');


    // console.log(JSON.stringify(aa.commentable, null, 2), 'eeeeeeeeeeeeeeeee');

})();



module.exports = {


};

