const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');
const multer = require('multer');

var app = express();

app.use(express.static('public'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(multer({ dest: '/temp/' }).array('image'));

app.get('/index2.html', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

app.post('/file_upload', (req, res) => {
    console.log(req.files[0]);
    var des_file = __dirname + '/' + req.files[0].originalname;
    fs.readFile(req.files[0].path, (err, data) => {
        if (err) {
            console.error(err);
        }
        fs.writeFile(des_file, data, (err) => {
            if (err) {
                console.error(err);
            } else {
                var response = {
                    message: 'file uploaded successfully',
                    filename: req.files[0].originalname
                };
                res.end(JSON.stringify(response));
            }
        })
    })
});
var server = app.listen(8086, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为：http://%s:%s', host, port);
})