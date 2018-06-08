const express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});
app.get('/process_get', (req, res) => {
    var response = 'First Name： ' + req.query.first_name + '\n' + 'Last Name： ' + req.query.last_name;
    res.end(response);
});
var server = app.listen(8084, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为：http://%s:%s', host, port);
})