const http = require('http');
const hostname = '127.0.0.1';
const port = 8007;
http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('hello world!');
}).listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});