const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 7000;
var pos;
http.createServer((request, response) => {
    var post = '';
    request.on('data', (chunk) => {
        post += chunk;
    });
    request.on('end', () => {
        post = querystring.parse(post);
    })
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*"
    });
    // if (typeof request == Number) {
    //     a = request;
    //     response.end('is a number');
    // } else {
    //     response.end('is not a number');
    // }
    response.end(post);
    pos = post;
}).listen(port, hostname, () => {
    console.log(pos);
});