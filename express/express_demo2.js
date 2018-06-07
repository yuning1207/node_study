const express = require('express');

var app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('主页get请求');
    res.send('hello get');
});

var server = app.listen(8082, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为htpp://%s:%s', host, port);
})