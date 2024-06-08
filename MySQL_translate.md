USE hello;
DESC zd_user;
ALTER TABLE zd_user MODIFY COLUMN user_name VARBINARY(100);#修改类型
ALTER TABLE zd_user CHANGE  user_name  nick_name VARBINARY(100);#修改列
ALTER TABLE zd_user ADD COLUMN login VARBINARY(100);#创建列
ALTER TABLE zd_user DROP COLUMN login;#删除列
CREATE TABLE students (#创建表
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    gender ENUM('Male', 'Female'),
    age INT,
    department VARCHAR(50)
);
DROP TABLE students; #删除表


USE hello;
DESC students;
#ALTER TABLE zd_user MODIFY COLUMN user_name VARBINARY(100);#修改类型
#ALTER TABLE zd_user CHANGE nick_name user_name VARBINARY(100);#修改列
#ALTER TABLE zd_user ADD COLUMN login VARBINARY(100);#创建列
#ALTER TABLE zd_user DROP COLUMN login;#删除列
CREATE TABLE students (#创建表
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    gender ENUM('Male', 'Female'),
    age INT,
    department VARCHAR(50)
);
#DROP TABLE students; #删除表
INSERT INTO students (id,name,gender,age,department) VALUES (1,'张三','Male','16','math')#插入一条数据

USE hello;
SELECT * FROM students;#查询表下面的所有数据

USE hello;
INSERT INTO students (id,name,gender,age,department) VALUES (2,'李四','Male','16','English')