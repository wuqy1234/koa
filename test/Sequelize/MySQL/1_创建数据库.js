const mysql = require('mysql2');

async function createDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 89,
        user: 'root',
        password: '123456'
    });

    connection.connect((err) => {
        if (err) {
            console.error('连接失败:', err.stack);
            return;
        }
        console.log('已连接到 MySQL 服务器');
    });

    const createDatabaseSql = 'CREATE DATABASE test3';

    // 执行创建数据库的 SQL 语句
    connection.query(createDatabaseSql, (err, results) => {
        if (err) {
            console.error('创建数据库失败:', err.stack);
            return;
        }
        console.log('数据库创建成功:', results);
    });

    // 关闭连接
    connection.end();

}

createDatabase().catch(err => console.log(err));