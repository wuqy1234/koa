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


  const aa = User.findAll({
      attributes: [
          //['name', '姓名']必须注释掉,因为不参与分组,所以是多余的,且会报错
          // ['name', '姓名'],
          ['age', '年龄'],
          [sequelize.fn('COUNT', sequelize.col('age')), '同龄人数']
      ],
      group: ['age']
  });
  console.log(aa.then(e => console.log(JSON.stringify(e, null, 4))))

  
  ```