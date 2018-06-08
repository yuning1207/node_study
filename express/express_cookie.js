const express = require('express');
const cookie = require('cookie-parser');
const util = require('util');

var app = express();
app.use(cookie());

app.get('/', (req, res) => {
    var cookiemsa = util.inspect(req.cookie);
    console.log(cookiemsa);
});
app.listen(8087);