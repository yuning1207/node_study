const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '135246',
    port: '3306',
    database: 'test',
});

connection.connect();

var sql = 'update websites set name=?,url=? where id=?';
var updatesqlparams = ['菜鸟移动站', 'https://m.runoob.com', 6];

connection.query(sql, updatesqlparams, (err, result) => {
    if (err) {
        console.log('[update error] - ', err.message);
        return;
    }
    console.log('----------------------------------update------------------------------------');
    console.log('update affectedRows', result.affectedRows);
    console.log('----------------------------------------------------------------------------\n\n');
});

connection.end();