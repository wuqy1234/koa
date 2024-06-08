
USE hello;
DESC students;
#修改类型
#ALTER TABLE zd_user MODIFY COLUMN user_name VARBINARY(100);
#修改列
#ALTER TABLE zd_user CHANGE nick_name user_name VARBINARY(100);
#创建列
#ALTER TABLE zd_user ADD COLUMN login VARBINARY(100);
#删除列
#ALTER TABLE zd_user DROP COLUMN login;
#创建表
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    gender ENUM('Male', 'Female'),
    age INT,
    department VARCHAR(50)
);
#DROP TABLE students; #删除表
#插入一条数据
INSERT INTO students (id,name,gender,age,department) VALUES (1,'张三','Male','16','math');
#插入多条数据
INSERT INTO students (id,name,gender,age,department) VALUES (1,'张三','Male','16','math'),(2,'李四','Male','16','language'),(3,'王五','Male','16','history'),(4,'赵六','female','16','politics');


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
