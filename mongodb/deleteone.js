const mongoclient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    var wherestr = { "name": "菜鸟教程" };
    dbo.collection('site').deleteOne(wherestr, (err, res) => {
        if (err) throw err;
        console.log('文档删除成功');
        db.close();
    })
})