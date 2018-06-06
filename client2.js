const http = require('http');
let options = {
    host: 'localhost',
    path: '/index2.html',
    port: 8080
};

var callback = function(res) {
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log(body);
    })
}
var req = http.request(options, callback);
req.end();