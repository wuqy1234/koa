const {
    Post,
    Image,
    Comment
} = require('./1_dockerDB');
const { Op } = require('sequelize');

(async () => {
    // const post = await Post.create({ title: 'First Post', content: 'This is the content of the first post' });
    // const image = await Image.create({ url: 'http://example.com/image.png' });
    // const comment1 = await Comment.create({ content: 'Great post!', commentableType: 'post', commentableId: post.id });
    // const comment2 = await Comment.create({ content: 'Nice image!', commentableType: 'image', commentableId: image.id });

    const aa = await Post.findAll({
        include: Comment

    })
    console.log(JSON.stringify(aa, null, 4));
})()