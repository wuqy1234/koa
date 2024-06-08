
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
INSERT INTO students (id,name,gender,age,department) VALUES (1,'张三','Male','16','math'),(2,'李四','Male','16','language');




USE hello;
#查询表下面的所有数据
SELECT * FROM students;


USE hello;
#设置了默认值
ALTER TABLE students MODIFY name VARCHAR(100) DEFAULT '张三';
#省略了name字段,默认值生效,(3,'Male','16','English')中不需要name字段
INSERT INTO students (id,gender,age,department) VALUES (3,'Male','16','English');