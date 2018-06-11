const mongoclient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    var wherestr = { "name": "菜鸟教程" };
    var updatestr = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection('site').updateOne(wherestr, updatestr, (err, res) => {
        if (err) throw err;
        console.log('文档更新成功');
        db.close();
    })
})