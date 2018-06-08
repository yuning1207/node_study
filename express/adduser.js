const express = require('express');
const fs = require('fs');

var app = express();

var users = {
    "user4": {
        "name": "yuning",
        "password": "password34",
        "profession": "student",
        "id": 4
    }
}
app.get('/adduser', (req, res) => {
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            data = JSON.parse(data);
            data["user4"] = users["user4"];
            res.end(JSON.stringify(data));
        }
    })
});
app.listen(7070);