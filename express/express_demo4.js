const express = require('express');
const body_parser = require('body-parser');
var app = express();
var urlencodedparser = body_parser.urlencoded({ extended: false });

app.get('/index1.html', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
});
app.post('/process_post', urlencodedparser, (req, res) => {
    var response = 'First name: ' + req.body.first_name + '\n' + 'Last name: ' + req.body.last_name;
    res.end(response);
});
var server = app.listen(8085, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为：http://%s:%s', host, port);
})