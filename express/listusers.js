const express = require('express');
const fs = require('fs');

var app = express();

app.get('/listusers', (req, res) => {
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.end(data);
        }
    })
});
app.listen(7070);