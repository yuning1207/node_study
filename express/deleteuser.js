const express = require('express');
const fs = require('fs');

var app = express();

var id = 2;

app.get('/deleteuser:id', (req, res) => {
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        delete data['user' + req.params.id]
        res.end(JSON.stringify(data));
    })
});

app.listen(7070);