const mongoclient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    var wherestr = { "name": "菜鸟教程" };
    dbo.collection('site').find(wherestr).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    })
})