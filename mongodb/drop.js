const mongoclient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    dbo.collection('site').drop((err, delOK) => {
        if (err) throw err;
        if (delOK) {
            console.log('集合已删除');
        }
        db.close();
    })
})