const {
    User,
    Profile,
    // User_Profile,
    Grant
} = require('./dockerDB');


(async () => {

    // const amidala = await User.create({
    //     username: 'p4dm34',
    //     points: 1000,
    //     profiles: [{
    //         name: 'Queen1',
    //         age: 12,
    //         grant: {//模型名字不对也无法写入
    //             selfGranted: true
    //         }
    //     }]
    // }, {
    //     include: {
    //         model: Profile,
    //         //默认会把所有属性写入数据库,如果声明了属性,则只会写入声明的属性
    //         // attributes: ['name', 'age'],
    //         include: {
    //             //需要声明此模型,否则无法写入数据库
    //             model: Grant,
    //             //声明模型属性,只有此模型属性才会写入数据库
    //             attributes: ['selfGranted']
    //         }
    //     }
    // });

    // const result = await User.findAll({
    //     where: { username: 'p4dm34' },
    //     include: {
    //         model: Profile,
    //         through: {
    //             attributes: ['selfGranted', "userId", "profileId"]
    //         }
    //     }
    // });

    // console.log(JSON.stringify(result, null, 2));

    const amidala = await User.create(
        {
            username: 'p4dm3', points: 1000, grants: [{ selfGranted: true }]
        },
        {
            include: [{
                model: Grant,
                attributes: ['selfGranted']
            }]
        }
    );

    const queen = await Profile.create(
        {
            name: 'Queen',
            grants: [{ selfGranted: true }]

        },
        {
            include: [{
                model: Grant,
                attributes: ['selfGranted']
            }]
        }
    );

    //直接给联结表插入数据
    // await Grant.create({ selfGranted: true });

    const aa = await User.findAll({
        include: {
            //查找Profile关联表,
            //但是此关联表是空的,因为两个表是分开插入联结表数据库的,所以会是空的
            model: Profile,
            //因为Profile表是空的,所以Grant也不会返回,这里的Grant是在Profile的include中声明的
            include: Grant
        }
        //如果声明以下模型,那么就会返回,因为是一起创建的
        // include: {
        //     model: Grant,
        // }
    });

    console.log(JSON.stringify(aa, null, 2))
})()