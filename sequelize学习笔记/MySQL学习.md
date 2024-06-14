```mysql
USE hello;
#查看表结构
DESC students;

USE hello;
#修改列的类型
#ALTER TABLE zd_user MODIFY COLUMN user_name VARBINARY(100);

USE hello;
#修改列的名字
ALTER TABLE zd_user CHANGE nick_name user_name VARBINARY(100);

USE hello;
#新增列
ALTER TABLE zd_user ADD COLUMN login VARBINARY(100);

USE hello;
#删除列
ALTER TABLE zd_user DROP COLUMN login;

USE hello;
#创建表
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    gender ENUM('Male', 'Female'),
    age INT,
    department VARCHAR(50)
);


USE hello;
#删除表
DROP TABLE students; 


USE hello;
#插入一条数据
INSERT INTO students (id,name,gender,age,department) VALUES (1,'张三','Male','16','math');


USE hello;
#插入多条数据
INSERT INTO students (id,name,gender,age,department) VALUES
 (4,'小明','Male','16','math'),
 (5,'小华','Male','16','language'),
 (6,'小李','Male','16','history'),
 (7,'小刘','female','16','politics');


USE hello;
#查询表下面的所有数据
SELECT * FROM students;


USE hello;
#设置了默认值
ALTER TABLE students MODIFY name VARCHAR(100) DEFAULT '张三';
#省略了name字段,默认值生效,(3,'Male','16','English')中不需要name字段
INSERT INTO students (id,gender,age,department) VALUES (3,'Male','16','English');


USE hello;
#修改数据,先找到科目为英语的,然后修改name为王五,此时科目为英语的name都是王五
UPDATE students SET name='王五' WHERE department='English';

USE hello;
#修改数据,id为3的,然后修改name为王五,
UPDATE students SET name='王五' WHERE id=3;

USE hello;
#去掉where条件,修改所有数据的name为女
UPDATE students SET gender='Female';

USE hello;
#删除数据,先找到科目为英语的,然后删除
DELETE FROM students WHERE department='English';

USE hello;
#查询age下面大于24的数据
SELECT * FROM customer WHERE age>24;

USE hello;
#查询age下面大于24小于30的数据
SELECT * FROM customer WHERE age>24 AND age<30;

USE hello;
#查询age下面大于24的数据,version小于5的数据
SELECT * FROM customer WHERE age>24 AND version<5;

USE hello;
#查询age下面大于24小于30的数据,或age大于20且version<5的数据
SELECT * FROM customer WHERE age>24 AND age<30 OR age>20 AND version<5;

USE hello;
#查询age下面小于24或大于30的数据,且version<5的数据
SELECT * FROM customer WHERE  (age>30 OR age<24) AND version<5;

USE hello;
#查询version为2或5的数据
SELECT * FROM customer WHERE version IN(2,5);

USE hello;
#查询version不为2或5的数据
SELECT * FROM customer WHERE version NOT IN(2,5);

USE hello;
#查询version为1到2的数据
SELECT * FROM customer WHERE version BETWEEN 1 AND 2;

USE hello;
#查询version为1到2的数据
SELECT * FROM customer WHERE version>=1 AND version<=2;

USE hello;
#查询version不在1到2区间的数据
SELECT * FROM customer WHERE version NOT BETWEEN 1 AND 2;

USE hello;
#查询version不在1到2区间的数据
SELECT * FROM customer WHERE version<1 AND version>2;

USE hello;
#name以"小"开头的数据
SELECT * FROM customer WHERE name LIKE '小%';

USE hello;
#name包含"小"的数据
SELECT * FROM customer WHERE name LIKE '%小%';

USE hello;
#name以"小"开头,两个字的名字,"_"下划线代表任意一个字符,"%"代表任意多个字符
SELECT * FROM customer WHERE name LIKE '小_';

USE hello;
#以小字开头的两个字的名字,"."代表任意一个字符,"^"开头,$代表结尾,[a-z]范围内的任意一个字符,[asd]a或s或s其中任意一个字符,A|B代表A或B。
SELECT * FROM customer WHERE name REGEXP '^小.$';

USE hello;
#邮箱为空的数据,如果email=null会查找不到数据,所以要使用 is null
SELECT * FROM customer WHERE email IS NULL;

USE hello;
#查找邮箱不为空的数据 ,IS NOT null 等同于 <=> null, email='' ,需要用 ,IS NOT null来查找空字符串
SELECT * FROM customer WHERE email IS NOT NULL OR email <=> '';

USE hello;
#对数据库进行排序,升序,降序为desc,ORDER BY排序字段
SELECT * FROM customer ORDER BY version;

USE hello;
#降序为desc
SELECT * FROM customer ORDER BY version DESC;

USE hello;
#降序为desc,version排在第7位,所以可以用7代替
SELECT * FROM customer ORDER BY 7 DESC;

USE hello;
#先按version降序,再按age降序,
SELECT * FROM customer ORDER BY version DESC ,age DESC;


USE hello;
#统计数据,统计customer表中有多少条数据
SELECT COUNT(*) FROM customer;


USE hello;
#求平均值,求customer表中的平均年龄
SELECT AVG(age) FROM customer;

USE hello;
#选择version进行分组,GROUP BY分组
SELECT version FROM customer GROUP BY version;

USE hello;
#选择age进行分组,统计每个年龄的个数
SELECT age,COUNT(age) FROM customer GROUP BY age;


USE hello;
#选择age进行分组,统计每个年龄的个数,并且个数大于等于4
SELECT age,COUNT(age) FROM customer GROUP BY age having COUNT(age)>=4;


USE hello;
#选择age进行分组,统计每个年龄的个数,并且个数大于等于1,并且个数升序排列
SELECT age,COUNT(age) FROM customer GROUP BY age having COUNT(age)>=1 ORDER BY COUNT(age) ASC;


USE hello;
#SUBSTR(name,1,1)截取name的第一个字符,然后统计每个字符的个数,并且个数大于等于1,并且个数降序排列
SELECT  SUBSTR(name,1,1),COUNT(SUBSTR(name,1,1)) FROM customer
GROUP BY SUBSTR(name,1,1)
HAVING COUNT(SUBSTR(name,1,1))>=1
ORDER BY COUNT(SUBSTR(name,1,1)) DESC;

USE hello;
SELECT  SUBSTR(name,1,1),COUNT(SUBSTR(name,1,1)) FROM customer
GROUP BY SUBSTR(name,1,1)
HAVING COUNT(SUBSTR(name,1,1))>=1
ORDER BY COUNT(SUBSTR(name,1,1)) DESC
#取3条数据,LIMIT 3,2表示从第3条开始取2条数据。
LIMIT 3;

USE hello;
#distinct去重
SELECT distinct version FROM customer

USE hello;
SELECT * FROM customer WHERE age BETWEEN 16 AND 20
#合并两个查询,并集,如果两个查询结果有相同的条数据,则只显示一次,如果使用UNION ALL,则显示两次
#intersect交集,except差集,差集是第一个查询结果减去第二个查询结果,同时减去两个查询结果的交集,就是差集
UNION 
SELECT * FROM customer WHERE version BETWEEN 2 AND 5;


USE hello;
#选择大于平均值的age
SELECT * from customer where age > (SELECT AVG(age) FROM customer)


USE hello;
#必填,一定要加逗号,否则会报错,查询结果会显示3列,选填的,不填则不会显示那一列
SELECT age , 
#选填,不填则不显示,显示平均值的整数
round((SELECT AVG(age) FROM customer)), 
#选填,不填则不显示,显示age和平均值的差值
age - round((SELECT AVG(age) FROM customer)) FROM customer #选填,显示age和平均值的差值


USE hello;
#必填,一定要加逗号,否则会报错,查询结果会显示3列,选填的,不填则不会显示那一列
SELECT age as '年龄', #as '别名'
#选填,不填则不显示,显示平均值的整数
round((SELECT AVG(age) FROM customer)) as '平均值的整数', 
#选填,不填则不显示,显示age和平均值的差值
age - round((SELECT AVG(age) FROM customer)) as '作差'#选填,显示age和平均值的差值
FROM customer ;


USE hello;
#创建新表,把查询结果插入新表中
CREATE TABLE new_customer SELECT * FROM customer WHERE age <=20;

USE hello;
#如果已经创建的新表,可以选择插入语句
INSERT INTO  new_customer SELECT * FROM customer WHERE age BETWEEN 25 AND 30;

USE hello;
#exists判断查询结果是否存在,如果存在则为1,否则为0
SELECT exists( SELECT * FROM customer WHERE age BETWEEN 25 AND 30)


#表的关联通常通过主键和外键来实现。主键是表中的一个唯一标识符，而外键是一个引用其他表的主键的字段。通过这种关系，可以在查询时将多个表的数据关联在一起。

#创建 customers 表
USE hello;
CREATE TABLE customers (
    #PRIMARY KEY主键
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
#创建 orders 表
USE hello;
CREATE TABLE orders (
    #PRIMARY KEY主键
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id INT,
    #外键约束,FOREIGN KEY外键
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


INSERT INTO customers (name, email) VALUES
('Alice', 'alice@example.com'),#customer_id=1
('Bob', 'bob@example.com'),#customer_id=2
('Carol', 'carol@example.com');#customer_id=3

INSERT INTO orders (order_date, customer_id) VALUES
('2024-06-01', 1),#对应customers表的customer_id=1
('2024-06-02', 2),#对应customers表的customer_id=2
('2024-06-03', 1);#对应customers表的customer_id=1



USE hello;
SELECT customers.name, orders.order_id, orders.order_date
FROM customers
#在customers表中加入orders表的数据,customers表的customer_id主键对应orders表的customer_id外键,即使 #orders 表没有主键，这个操作仍然有效。
#内联查询,只有主键和外键对应上了才会显示
INNER JOIN orders ON customers.customer_id = orders.customer_id;

USE hello;
SELECT customers.name, orders.order_id, orders.order_date
FROM customers
#把左边的表加入右边的表,显示右表,右表没有和左表对应上的会显示null
LEFT JOIN orders ON customers.customer_id = orders.customer_id;

USE hello;
SELECT customers.name, orders.order_id, orders.order_date
FROM customers
#把右边的表加入左边的表,显示左表,左表没有和右表对应上的会显示null
RIGHT JOIN orders ON customers.customer_id = orders.customer_id;

USE hello;
#SELECT子句可以选择显示哪几个列的信息,这里显示了 name,version,phone, age
SELECT name,version,phone, age 
FROM customer
#age大于20
WHERE age >20
#根据phone排序,默认降序
ORDER BY phone
#显示10条数据
LIMIT 10;

```
