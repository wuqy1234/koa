```js

await jane.destroy();//删除实例

  await User.drop()//删除表

await jane.reload();//刷新数据库的作用,使得js页面的json数据与数据库数据同步

await jane.update({ name: "xxxx" })//只保存部分属性

await jane.save({ fields: ['name'] });//只保存部分属性,如果不传入参数则保存所有属性

{
const jane = await User.create({ name: "小张1", favoriteColor: 'black', age: 6, cash: 50 });

jane.name = "小白1";
jane.favoriteColor = "white";
await jane.save();//起到更新修改的作用
}


const users = await User.findAll();//查询表中所有数据
console.log(JSON.stringify(users, null, 2));

//批量创建
   const users = await User.bulkCreate([
        { name: '孙一', age: 18, cash: 50 },
        { name: '钱二', age: 26, cash: 50 },
        { name: '张三', age: 26, cash: 50 },
        { name: '李四', age: 28, cash: 50 },
        { name: '王五', age: 20, cash: 50 },
        { name: '赵六', age: 22, cash: 50 },
        { name: '冯七', age: 20, cash: 50 },
        { name: '周八', age: 22, cash: 50 },
        { name: '吴久', age: 22, cash: 50 },
        { name: '朱十', age: 22, cash: 50 },
    ], { validate: true });


    const users1 = await User.bulkCreate([
        { name: '小孙', age: 18, cash: 50 },
        { name: '小钱', age: 26, cash: 50 },
        { name: '小张', age: 26, cash: 50 },
        { name: '小李', age: 18, cash: 50 },
        { name: '小王', age: 20, cash: 50 },
        { name: '老赵', age: 22, cash: 50 },
        { name: '老冯', age: 20, cash: 50 },
        { name: '老周', age: 22, cash: 50 },
        { name: '老吴', age: 22, cash: 50 },
        { name: '老朱', age: 22, cash: 50 },
    ], { validate: true });



 // 将所有没有姓氏的人更改为 "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});


  await User.destroy({
        where: {
            id: {
                [Op.gt]: 20
            }
        }
    })

  const users = await User.findAndCountAll({
      where: {
          name: {
              [Op.like]: '老%'
          }
      },
      offset: 3,
      limit: 2,
      group: ['id', 'name']
  });


const jane = await User.create({ name: "Jane" });
// console.log(jane); // 不要这样!
console.log(jane.toJSON()); // 这样最好!
console.log(JSON.stringify(jane, null, 4)); // 这样也不错!



const aa = User.findAll({
      attributes: [
          ['name', '姓名'],
          ['age', '年龄'],
          // count方法的别名,'同龄人数'
          [sequelize.fn('COUNT', '*'), '同龄人数']
      ],
      //按两个条件分组,年龄和姓名分组,这两个条件组合都是唯一的,没有重复的,所以count方法只会显示1
      group: ['age', "name"]
  });
  console.log(aa.then(e => console.log(JSON.stringify(e, null, 4))))


  const aa = User.findAll({//因为没有加await,所以这里返回的是一个promise对象
      attributes: [
          //['name', '姓名']必须注释掉,因为不参与分组,所以是多余的,且会报错
          // ['name', '姓名'],
          ['age', '年龄'],
          [sequelize.fn('COUNT', sequelize.col('age')), '同龄人数']
      ],
      group: ['age']
  });
  console.log(aa.then(e => console.log(JSON.stringify(e, null, 4))))
  //如果aa = await User.findAll,加了await, 就能console.log(JSON.stringify(aa, null, 4))
  //没有加await时,console.log(aa)打印promise { <pending> },因为这是一个promise,没有完成时就会返回promise { <pending> },完成时此函数就会return需要返回的值,同时resolve,当resolve时,变量aa接收的是此函数返回的值,此时不是一个promise,所以不能使用then了




const bb = Product.create({
    title: 'Chair',
    //如果有别名,需使用别名,否则使用默认的名字,如果名字错误会创建失败
    userOne_1: {
        firstName: 'Mick',
        lastName: 'Broadstone',
        addresses_1: [{
            type: 'home',
            line1: '100 Main St.',
            city: 'Austin',
            state: 'TX',
            zip: '78704'
        }]
    }
}, {
    include: [{
        association: Product.UserOne,//属性中的别名生效
        as: 'userOne',//可有可无,不影响
        include: [{
            association: UserOne.Addresses,//属性中的别名生效
            as: "addresses"//可有可无,不影响
        }]
    }]
});



const amidala = await User.create({ username: 'p4dm3', points: 1000 });
const queen = await Profile.create({ name: 'Queen' });
await amidala.addProfile(queen, { through: { selfGranted: false } });
const result = await User.findAll({
    where: { username: 'p4dm3' },
    include: {
        model: Profile,
        through: {
            attributes: ['selfGranted']
        }
    }
});
console.log(JSON.stringify(result, null, 2));

  








认真比对两者的区别

方式1:
   const amidala = await User.create({
        username: 'p4dm34',
        points: 1000,
        profiles: [{
            name: 'Queen',
            grant: {//模型名字不对也无法写入
                selfGranted: true
            }
        }]
    }, {
        include: {
            model: Profile,
            //默认会把所有属性写入数据库,如果声明了属性,则只会写入声明的属性
            // attributes: ['name', 'age'],
            include: {
                //需要声明此模型,否则无法写入数据库
                model: Grant,
                //声明模型属性,只有此模型属性才会写入数据库
                attributes: ['selfGranted']
            }
        }
    });

    const result = await User.findAll({
        where: { username: 'p4dm33' },
        include: {
            model: Profile,
            through: {
                //查询时需要的联结表的属性,默认情况下是全返回的,在这里声明需要的属性
                //这里还可以以模型的声明方式来获取属性,去除through,再嵌入include;不过联结表的的属性是默认返回的,因此会返回两次联结表的数据
                attributes: ['selfGranted', "userId", "profileId"]
            }
        }
    });

    console.log(JSON.stringify(result, null, 2));

    方式2:

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

    //能够起到方式1的效果,这里是把amidala(user)的实例和queen(profile)的实例插入联结表,同时插入联结表的实例即{ through: { selfGranted: true }
    await amidala.addProfile(queen, { through: { selfGranted: true } });

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


修改方式2使其达到和方式1一样的效果:

const amidala = await User.create({username: '小花', points: 1000});
const queen = await Profile.create({name: 'Queen'});
//特别注意:是addProfile,不是addUser
//不使用add方法数据无法相互关联,数据会分散,多对多使用add,一对一使用set
await amidala.addProfile(queen, { through: { selfGranted: true } });

等效于:
const amidala = await User.create({
        username: '小花',
        points: 1000,
        profiles: [{
            name: 'Queen',
            grant: {
                selfGranted: true
            }
        }]
    }, {
        include: {
            model: Profile,
            include: {
                model: Grant,
                attributes: ['selfGranted']
            }
        }
    });


  ```