const mongoclient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

mongoclient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db('runoob');
    dbo.collection('orders').aggregate([{
        $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: '_id',
            as: 'orderdetails'
        }
    }], (err, res) => {
        if (err) throw err;
        console.log(res.result);
        db.close();
    })
})