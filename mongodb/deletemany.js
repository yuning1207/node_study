var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var where = { "type": "en" };
    dbo.collection('site').deleteMany(where, (err, res) => {
        if (err) throw err;
        console.log(res.result.n + " 条文档被删除");
        db.close();
    })
});