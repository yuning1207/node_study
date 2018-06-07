const express = require('express');

var app = express();

app.get('/', (req, res) => {
    console.log('主页get请求');
    res.send('hello get');
});
app.post('/', (req, res) => {
    console.log('主页post请求');
    res.send('hello post');
});
app.get('/index1', (req, res) => {
    console.log('/index1 get请求');
    res.send('删除页面');
});
app.get('/index2', (req, res) => {
    console.log('/index2 get请求');
    res.send('用户列表页面');
});
app.get('/ab*cd', (req, res) => {
    console.log('/ab*cd get 请求');
    res.send('正则匹配');
});
var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port)
});