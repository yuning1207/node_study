const express = require('express');
const fs = require('fs');

var app = express();

app.get('/:id', (req, res) => {
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            data = JSON.parse(data);
            var response = data['user' + req.params.id];
            res.end(JSON.stringify(response));
        }
    })
});
app.listen(7070);