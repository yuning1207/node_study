const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '135246',
    port: '3306',
    database: 'test'
});

connection.connect();

var addsql = 'insert into websites(id,name,url,alexa,country) values(0,?,?,?,?)';
var addsqlparams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
connection.query(addsql, addsqlparams, (err, result) => {
    if (err) {
        console.log('[insert error] - ', err.message);
        return;
    }
    console.log('--------------------------------insert------------------------------');
    console.log('insetId: ', result);
    console.log('--------------------------------------------------------------------\n\n');
})