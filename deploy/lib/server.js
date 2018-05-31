import { stat } from 'fs/promises';

// var fs = require('fs');
// var path = require('path');
// var http = require('http');
// var MIME = {
//     '.css': 'text/css',
//     '.js': 'application/javascript'
// };

// function parseurl(root, url) {
//     if (url.indexof('??') === -1) {
//         url = url.replace('/', '/??');
//     }
//     var path = url.split('??');
//     var pathnames = path[1].split(',').map((value) => path.join(root, path[0], value));
//     return {
//         mime: MIME[path.extname(pathnames[0])] || 'text/plain',
//         pathnames: pathnames
//     }
// }

// function combine(pathnames, callback) {
//     var output = [];
//     (function next(i, len) {
//         if (i < len) {
//             fs.readFile(pathnames[i], function(err, data) {
//                 if (err) {
//                     callback(err);
//                 } else {
//                     output.push(data);
//                     next(i + 1, len);
//                 }
//             })
//         } else {
//             callback(null, Buffer.concat(output));
//         }
//     }(0, pathnames.length))
// }

// function main(argv) {
//     var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
//     var root = config.root || '.';
//     var port = config.port || 80;
//     http.createServer(function(request, response) {
//         var urlinfo = parseurl(root, request.url);
//         combine(urlinfo.pathnames, function(err, data) {
//             if (err) {
//                 response.writeHead(404);
//                 response.end(err.message);
//             } else {
//                 response.writeHead(200, {
//                     'Content-Type': urlinfo.mime
//                 });
//                 response.end(data);
//             }
//         })
//     }).listen(port);
// }
// main(process.argv.slice(2));


var fs = require('fs');
var path = require('path');
var http = require('http');
var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function parseurl(root, url) {
    if (url.indexof('??') === -1) {
        url = url.replace('/', '/??');
    }
    var path = url.split('??');
    var pathnames = path[1].split(',').map((value) => path.join(root, path[0], value));
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    }
}

function combine(pathnames, callback) {

    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function(err, data) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, pathnames.length);
                }
            })
        } else {
            callback(null, pathnames);
        }
    }(0, pathnames.length))
}

function outputFile(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);
            reader.pipe(writer, { end: false });
            reader.on('end', function() {
                next(i + 1, pathnames.length);
            })
        } else {
            writer.end();
        }
    }(0, pathnames.length))
}

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
    var root = config.root || '.';
    var port = config.port || 80;
    var server = http.createServer(function(request, response) {
        var urlinfo = parseurl(root, request.url);
        combine(urlinfo.pathnames, function(err, data) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlinfo.mime
                });
                outputFile(urlinfo.pathnames, response);
            }
        })
    }).listen(port);
    process.on('SIGTERM', function() {
        server.close(function() {
            process.exit(0);
        })
    })
}
main(process.argv.slice(2));