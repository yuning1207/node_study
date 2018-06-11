const mongoclient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    var wherestr = { "type": "en" };
    var updatestr = { $set: { "url": "https://www.runoob.com" } };
    dbo.collection('site').updateMany(wherestr, updatestr, (err, res) => {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
    })
})